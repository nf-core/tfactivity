include { TF_TG_SCORE               } from '../../modules/local/ranking/tf_tg_score'
include { RANKING as CREATE_RANKING } from '../../modules/local/ranking/ranking'
include { COMBINE_RANKINGS          } from '../../modules/local/ranking/combine_rankings'

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
    COMBINE_RANKINGS(CREATE_RANKING.out.ranking .map{ meta, ranking -> ranking }
                                                .collect()
                                                .map{ rankings -> [[id: "all"], rankings]}
    )

    ch_versions = ch_versions.mix(TF_TG_SCORE.out.versions,
                                  CREATE_RANKING.out.versions,
                                  COMBINE_RANKINGS.out.versions
    )


    emit:
    assay_specific = CREATE_RANKING.out.ranking
    combined       = COMBINE_RANKINGS.out.ranking


    versions = ch_versions                     // channel: [ versions.yml ]
}

