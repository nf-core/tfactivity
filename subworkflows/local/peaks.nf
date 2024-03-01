// Modules
include { GAWK as CLEAN_BED             } from '../../modules/nf-core/gawk/main'
include { BEDTOOLS_SORT as SORT_PEAKS   } from '../../modules/nf-core/bedtools/sort/main'

// Subworkflows
include { MERGE_SAMPLES as MERGE_SAMPLES } from './merge_samples'

workflow PEAKS {

    take:
    ch_peaks // channel: [ val(meta), [ peaks ] ]
    merge_samples

    main:

    ch_versions = Channel.empty()

    CLEAN_BED(ch_peaks, [])

    if (merge_samples) {
        MERGE_SAMPLES(CLEAN_BED.out.output)
        ch_peaks = MERGE_SAMPLES.out.merged
        ch_versions = ch_versions.mix(MERGE_SAMPLES.out.versions)
    } else {
        SORT_PEAKS(CLEAN_BED.out.output, [])
        ch_peaks = SORT_PEAKS.out.sorted
        ch_versions = ch_versions.mix(SORT_PEAKS.out.versions)
    }

    emit:

    versions = ch_versions                     // channel: [ versions.yml ]
}
