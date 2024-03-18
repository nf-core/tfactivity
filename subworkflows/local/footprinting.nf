include { BEDTOOLS_MERGE                } from '../../modules/nf-core/bedtools/merge/main'
include { BEDTOOLS_SUBTRACT             } from '../../modules/nf-core/bedtools/subtract/main'

workflow FOOTPRINTING {

    take:
    ch_peaks

    main:

    ch_versions = Channel.empty()

    ch_footprint_split = ch_peaks.branch{
        meta, peaks ->
            footprinting: meta.footprinting
            as_is: !meta.footprinting
    }

    BEDTOOLS_MERGE( ch_footprint_split.footprinting )

    ch_include_original_split = BEDTOOLS_MERGE.out.bed
        .branch{
            meta, bed ->
                include: meta.include_original
                subtract: !meta.include_original
        }

    ch_subtract_pairs = ch_include_original_split.subtract
        .join( ch_peaks )

    BEDTOOLS_SUBTRACT( ch_subtract_pairs )

    ch_versions = ch_versions.mix(
        BEDTOOLS_MERGE.out.versions,
        BEDTOOLS_SUBTRACT.out.versions
    )

    emit:
    footprinted_peaks = ch_footprint_split.as_is.mix(
        ch_include_original_split.include,
        BEDTOOLS_SUBTRACT.out.bed
    )

    versions = ch_versions                     // channel: [ versions.yml ]
}
