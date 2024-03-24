include { TF_TG_SCORE                                 } from '../../modules/local/ranking/tf_tg_score'
include { RANKING as CREATE_RANKING                   } from '../../modules/local/ranking/ranking'
include { COMBINE_TABLES as COMBINE_TFS_PER_ASSAY     } from '../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TFS_ACROSS_ASSAYS } from '../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TGS_PER_ASSAY     } from '../../modules/local/combine_tables/main'
include { COMBINE_TABLES as COMBINE_TGS_ACROSS_ASSAYS } from '../../modules/local/combine_tables/main'

workflow RANKING {

    take:
    ch_differential
    ch_affinities
    ch_regression_coefficients
    alpha

    main:

    ch_versions = Channel.empty()

    ch_combined = ch_differential.map{meta, differential ->
            [meta.condition1, meta.condition2, differential]}
        .combine(ch_affinities.map{meta, affinities ->
            [meta.condition1, meta.condition2, meta.assay, affinities]}, by: [0, 1])
        .map{condition1, condition2, differential, assay, affinities ->
            [condition1, condition2, assay, differential, affinities]}
        .combine(ch_regression_coefficients.map{meta, regression_coefficients ->
            [meta.condition1, meta.condition2, meta.assay, meta, regression_coefficients]}, by: [0, 1, 2])
        .map{condition1, condition2, assay, differential, affinities, meta, regression_coefficients ->
            [meta, differential, affinities, regression_coefficients]}

    TF_TG_SCORE(ch_combined)
    CREATE_RANKING(TF_TG_SCORE.out.score, alpha)
    COMBINE_TFS_PER_ASSAY(CREATE_RANKING.out.tfs.map{ meta, ranking -> [[id: meta.assay], ranking]}
                                                .groupTuple(), "rank")
    COMBINE_TFS_ACROSS_ASSAYS(COMBINE_TFS_PER_ASSAY.out.combined.map{ meta, ranking -> ranking }
                                                .collect()
                                                .map{ rankings -> [[id: "all"], rankings]},
                                                "rank"
    )

    COMBINE_TGS_PER_ASSAY(CREATE_RANKING.out.tgs.map{ meta, table -> [[id: meta.assay], table]}
                                                .groupTuple(), "rank")
    COMBINE_TGS_ACROSS_ASSAYS(COMBINE_TGS_PER_ASSAY.out.combined.map{ meta, table -> table }
                                                .collect()
                                                .map{ tables -> [[id: "all"], tables]},
                                                "rank"
    )

    ch_versions = ch_versions.mix(TF_TG_SCORE.out.versions,
                                    CREATE_RANKING.out.versions,
                                    COMBINE_TFS_PER_ASSAY.out.versions,
                                    COMBINE_TFS_ACROSS_ASSAYS.out.versions,
                                    COMBINE_TGS_PER_ASSAY.out.versions,
                                    COMBINE_TGS_PER_ASSAY.out.versions
    )


    emit:
    tf_ranking = COMBINE_TFS_PER_ASSAY.out.combined
    tg_ranking = COMBINE_TGS_PER_ASSAY.out.combined


    versions = ch_versions                     // channel: [ versions.yml ]
}
