include { BEDTOOLS_MERGE    } from '../../../modules/nf-core/bedtools/merge/main'
include { BEDTOOLS_SUBTRACT } from '../../../modules/nf-core/bedtools/subtract/main'

workflow FOOTPRINTING {
    take:
    ch_peaks

    main:

    ch_versions = Channel.empty()

    // Sort peak files into non footprinting and footprinting
    ch_footprint_split = ch_peaks.branch { meta, _peaks ->
        footprinting: meta.footprinting
        as_is: !meta.footprinting
    }

    // merge peaks less than max_peak_gap apart from each other
    BEDTOOLS_MERGE(ch_footprint_split.footprinting)
    ch_versions = ch_versions.mix(BEDTOOLS_MERGE.out.versions)

    // Split merged peaks into include_original and subtract
    ch_include_original_split = BEDTOOLS_MERGE.out.bed.branch { meta, _bed ->
        incl: meta.include_original
        subtract: !meta.include_original
    }

    // Inner join by the meta objects
    ch_subtract_pairs = ch_include_original_split.subtract.join(ch_peaks)

    // Subtract the original peaks from the merged peaks (only keep the region between two peaks)
    BEDTOOLS_SUBTRACT(ch_subtract_pairs)
    ch_versions = ch_versions.mix(BEDTOOLS_SUBTRACT.out.versions)

    emit:
    footprinted_peaks = ch_footprint_split.as_is.mix(
        ch_include_original_split.incl,
        BEDTOOLS_SUBTRACT.out.bed,
    )
    versions          = ch_versions // channel: [ versions.yml ]
}
