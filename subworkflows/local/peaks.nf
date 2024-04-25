// Modules
include { GAWK as CLEAN_BED               } from '../../modules/nf-core/gawk/main'
include { BEDTOOLS_SORT as SORT_PEAKS     } from '../../modules/nf-core/bedtools/sort/main'
include { FILTER_PWMS                     } from '../../modules/local/peaks/filter_pwms'
include { STARE                           } from '../../modules/local/peaks/stare'
include { AGGREGATE_SYNONYMS              } from '../../modules/local/peaks/aggregate_synonyms/main'
include { COMBINE_TABLES as AFFINITY_MEAN } from '../../modules/local/combine_tables/main'
include { COMBINE_TABLES as AFFINITY_RATIO} from '../../modules/local/combine_tables/main'
include { COMBINE_TABLES as AFFINITY_SUM  } from '../../modules/local/combine_tables/main'

// Subworkflows
include { FOOTPRINTING               } from './footprinting'
include { MERGE_SAMPLES              } from './merge_samples'
include { CHROMHMM                   } from './chromhmm'
include { ROSE                       } from './rose'

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
    contrasts
    tfs
    gene_map
    agg_method
    ch_samplesheet_bam
    chrom_sizes
    chromhmm_states
    chromhmm_threshold
    chromhmm_marks

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

    CHROMHMM(ch_samplesheet_bam, chrom_sizes, chromhmm_states, chromhmm_threshold, chromhmm_marks)
    ROSE(CHROMHMM.out.enhancers, gtf.map{gtf -> [[id: "gtf"], gtf]})

    ch_versions = ch_versions.mix(CHROMHMM.out.versions)
    ch_versions = ch_versions.mix(ROSE.out.versions)

    ch_peaks = ch_peaks .mix(ROSE.out.enhancers)
                        .map { meta, peaks -> [[
                            id: meta.id,
                            condition: meta.condition,
                            assay: meta.assay], peaks]}

    FILTER_PWMS(tfs, pwms)

    STARE(
        ch_peaks,
        fasta,
        gtf,
        blacklist,
        FILTER_PWMS.out.pwms.collect(),
        window_size,
        decay
    )

    ch_affinities = STARE.out.affinities

    if (!merge_samples) {
        AFFINITY_MEAN(ch_affinities
            .map { meta, affinities -> [meta.condition, meta.assay, affinities] }
            .groupTuple(by: [0, 1])
            .map { condition, assay, affinities -> [[id: condition + "_" + assay,
                                                        condition: condition,
                                                        assay: assay], affinities] },
            "mean"
        )

        ch_affinities = AFFINITY_MEAN.out.combined
        ch_versions = ch_versions.mix(AFFINITY_MEAN.out.versions)
    }

    AGGREGATE_SYNONYMS(
        ch_affinities,
        gene_map,
        agg_method
    )

    ch_affinities_spread = AGGREGATE_SYNONYMS.out.affinities
        .map { meta, affinities -> [meta.condition, meta.assay, affinities] }

    ch_contrast_affinities = contrasts
        .map {condition1, condition2 -> [condition2, condition1]}
        .combine(ch_affinities_spread, by: 0)
        .map {condition2, condition1, assay2, affinities2 ->
                [condition1, condition2, assay2, affinities2] }
        .combine(ch_affinities_spread, by: 0)
        .map {condition1, condition2, assay2, affinities2, assay1, affinities1 ->
                [condition1, condition2, assay1, affinities1, assay2, affinities2] }
        .filter {condition1, condition2, assay1, affinities1, assay2, affinities2 ->
                assay1 == assay2}
        .map {condition1, condition2, assay1, affinities1, assay2, affinities2 ->
                [[id: condition1 + ":" + condition2 + "_" + assay1,
                    contrast: condition1 + ":" + condition2,
                    condition1: condition1, condition2: condition2,
                    assay: assay1],
                    [affinities1, affinities2]] }

    AFFINITY_RATIO(ch_contrast_affinities, "ratio")
    AFFINITY_SUM(ch_contrast_affinities, "sum")

    ch_versions = ch_versions.mix(
        FILTER_PWMS.out.versions,
        STARE.out.versions,
        AGGREGATE_SYNONYMS.out.versions,
        AFFINITY_RATIO.out.versions,
        AFFINITY_SUM.out.versions
    )

    emit:
    affinity_ratio = AFFINITY_RATIO.out.combined
    affinity_sum = AFFINITY_SUM.out.combined
    enhancers = ROSE.out.enhancers

    versions = ch_versions                     // channel: [ versions.yml ]
}
