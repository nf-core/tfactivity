include { TF_TG_SCORE                                 } from '../../../modules/local/ranking/tf_tg_score'
include { RANKING as CREATE_RANKING                   } from '../../../modules/local/ranking/ranking'
include { COMBINE_TABLES as COMBINE_TFS_PER_ASSAY     } from '../../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TFS_ACROSS_ASSAYS } from '../../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TGS_PER_ASSAY     } from '../../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TGS_ACROSS_ASSAYS } from '../../../modules/local/combine_tables/main'

workflow RANKING {
    take:
    ch_differential
    ch_affinities
    ch_regression_coefficients
    alpha

    main:

    ch_versions = Channel.empty()

    // Combine differential expression results, affinities and regression coefficients
    ch_combined = ch_differential
        .map { meta, differential ->
            [meta.condition1, meta.condition2, differential]
        }
        .combine(
            ch_affinities.map { meta, affinities ->
                [meta.condition1, meta.condition2, meta.assay, affinities]
            },
            by: [0, 1]
        )
        .map { condition1, condition2, differential, assay, affinities ->
            [condition1, condition2, assay, differential, affinities]
        }
        .combine(
            ch_regression_coefficients.map { meta, regression_coefficients ->
                [meta.condition1, meta.condition2, meta.assay, meta, regression_coefficients]
            },
            by: [0, 1, 2]
        )
        .map { _condition1, _condition2, _assay, differential, affinities, meta, regression_coefficients ->
            [meta, differential, affinities, regression_coefficients]
        }

    // Multiplies each gene (row) in the affinities matrix with its log2FC and each TF (column) with its regression coefficient
    TF_TG_SCORE(ch_combined)
    // Create ranking (dcg) for each TF across all genes and for each TF-gene combination
    CREATE_RANKING(TF_TG_SCORE.out.score, alpha)
    // Sum TF-based rank files for each assay and create a combined rank file
    COMBINE_TFS_PER_ASSAY(
        CREATE_RANKING.out.tfs.map { meta, ranking -> [[id: meta.assay], ranking] }.groupTuple(),
        "rank",
    )
    // Sum TF-based assay level rank files for all assays and create a combined rank file
    COMBINE_TFS_ACROSS_ASSAYS(
        COMBINE_TFS_PER_ASSAY.out.combined.map { _meta, ranking -> ranking }.collect().map { rankings -> [[id: "all"], rankings] },
        "rank",
    )

    // Sum TF-gene-based rank files for each assay and create a combined rank file
    COMBINE_TGS_PER_ASSAY(
        CREATE_RANKING.out.tgs.map { meta, table -> [[id: meta.assay], table] }.groupTuple(),
        "rank",
    )

    // Sum TF-gene-based assay level rank files for all assays and create a combined rank file
    // this file is not used any further in the pipeline
    COMBINE_TGS_ACROSS_ASSAYS(
        COMBINE_TGS_PER_ASSAY.out.combined.map { _meta, table -> table }.collect().map { tables -> [[id: "all"], tables] },
        "rank",
    )

    ch_versions = ch_versions.mix(
        TF_TG_SCORE.out.versions,
        CREATE_RANKING.out.versions,
        COMBINE_TFS_PER_ASSAY.out.versions,
        COMBINE_TFS_ACROSS_ASSAYS.out.versions,
        COMBINE_TGS_PER_ASSAY.out.versions,
        COMBINE_TGS_ACROSS_ASSAYS.out.versions,
    )

    emit:
    tf_ranking       = COMBINE_TFS_PER_ASSAY.out.combined
    tg_ranking       = COMBINE_TGS_PER_ASSAY.out.combined
    tf_total_ranking = COMBINE_TFS_ACROSS_ASSAYS.out.combined
    versions         = ch_versions // channel: [ versions.yml ]
}
