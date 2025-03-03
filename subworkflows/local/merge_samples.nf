include { GAWK as ANNOTATE_SAMPLES      } from '../../modules/nf-core/gawk/main'
include { CAT_CAT as CONCAT_SAMPLES     } from '../../modules/nf-core/cat/cat/main'
include { BEDTOOLS_SORT                 } from '../../modules/nf-core/bedtools/sort/main'
include { BEDTOOLS_MERGE                } from '../../modules/nf-core/bedtools/merge/main'
include { GAWK as FILTER_MIN_OCCURRENCE } from '../../modules/nf-core/gawk/main'
include { GAWK as CLEAN_BED             } from '../../modules/nf-core/gawk/main'

workflow MERGE_SAMPLES {

    take:
    ch_peaks

    main:

    ch_versions = Channel.empty()

    ANNOTATE_SAMPLES(ch_peaks, [])

    ch_grouped = ANNOTATE_SAMPLES.out.output
                    .map{ meta, peak_file -> [meta + [id: meta.condition + "_" + meta.assay], peak_file]}
                    .groupTuple()

    // ch_grouped.view()

    CONCAT_SAMPLES(ch_grouped)
    BEDTOOLS_SORT(CONCAT_SAMPLES.out.file_out, [])
    BEDTOOLS_MERGE(BEDTOOLS_SORT.out.sorted)
    FILTER_MIN_OCCURRENCE(BEDTOOLS_MERGE.out.bed, [])
    CLEAN_BED(FILTER_MIN_OCCURRENCE.out.output, [])

    ch_versions = ch_versions.mix(
        ANNOTATE_SAMPLES.out.versions,
        CONCAT_SAMPLES.out.versions,
        BEDTOOLS_SORT.out.versions,
        BEDTOOLS_MERGE.out.versions,
        FILTER_MIN_OCCURRENCE.out.versions,
        CLEAN_BED.out.versions
    )

    emit:
    merged = CLEAN_BED.out.output

    versions = ch_versions                     // channel: [ versions.yml ]
}

