include { DYNAMITE_PREPROCESS as PREPROCESS } from '../../../modules/local/dynamite/preprocess'
include { DYNAMITE_DYNAMITE as RUN_DYNAMITE } from '../../../modules/local/dynamite/dynamite'
include { GAWK as FILTER                    } from '../../../modules/nf-core/gawk/main'

workflow DYNAMITE {
    take:
    ch_differential
    ch_affinity_ratio
    ofolds
    ifolds
    alpha
    randomize

    main:

    ch_versions = Channel.empty()

    ch_combined = ch_differential
        .map { meta, differential ->
            [meta.condition1, meta.condition2, meta, differential]
        }
        .combine(
            ch_affinity_ratio.map { meta, affinity_ratio ->
                [meta.condition1, meta.condition2, meta, affinity_ratio]
            },
            by: [0, 1]
        )
        .map { _condition1, _condition2, _meta_differential, differential, meta_affinity, affinity_ratio ->
            [meta_affinity, differential, affinity_ratio]
        }

    PREPROCESS(ch_combined)
    ch_versions = ch_versions.mix(PREPROCESS.out.versions)

    RUN_DYNAMITE(PREPROCESS.out.output, ofolds, ifolds, alpha, randomize)
    ch_versions = ch_versions.mix(RUN_DYNAMITE.out.versions)

    FILTER(RUN_DYNAMITE.out.regression_coefficients, [], false)
    ch_versions = ch_versions.mix(FILTER.out.versions)

    emit:
    all_coefficients      = RUN_DYNAMITE.out.regression_coefficients
    filtered_coefficients = FILTER.out.output
    versions              = ch_versions // channel: [ versions.yml ]
}
