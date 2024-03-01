// Modules
include { GAWK as CLEAN_BED               } from '../../modules/nf-core/gawk/main'
include { BEDTOOLS_SORT as SORT_PEAKS     } from '../../modules/nf-core/bedtools/sort/main'
include { BEDTOOLS_SUBTRACT as BLACKLIST  } from '../../modules/nf-core/bedtools/subtract/main'
include { STARE                           } from '../../modules/local/stare/main'

// Subworkflows
include { FOOTPRINTING               } from './footprinting'
include { MERGE_SAMPLES              } from './merge_samples'

workflow PEAKS {

    take:
    ch_peaks // channel: [ val(meta), [ peaks ] ]
    fasta
    gtf
    blacklist
    pwms
    window_size
    decay
    merge_samples

    main:

    ch_versions = Channel.empty()

    CLEAN_BED(ch_peaks, [])

    ch_peaks = CLEAN_BED.out.output

    FOOTPRINTING(ch_peaks)

    ch_peaks = FOOTPRINTING.out.footprinted_peaks

    ch_versions = ch_versions.mix(
        CLEAN_BED.out.versions,
        FOOTPRINTING.out.versions
    )

    if (merge_samples) {
        MERGE_SAMPLES(ch_peaks)
        ch_peaks = MERGE_SAMPLES.out.merged
        ch_versions = ch_versions.mix(MERGE_SAMPLES.out.versions)
    } else {
        SORT_PEAKS(ch_peaks, [])
        ch_peaks = SORT_PEAKS.out.sorted
        ch_versions = ch_versions.mix(SORT_PEAKS.out.versions)
    }

    STARE(
        ch_peaks,
        fasta,
        gtf,
        blacklist,
        pwms,
        window_size,
        decay
    )

    ch_versions = ch_versions.mix(
        STARE.out.versions
    )

    emit:

    versions = ch_versions                     // channel: [ versions.yml ]
}
