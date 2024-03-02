include { PREPROCESS } from '../../modules/local/dynamite/preprocess'

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

    ch_combined = ch_differential.map{ meta, differential -> 
            [meta.condition1, meta.condition2, meta, differential]}
        .combine(ch_affinity_ratio.map{ meta, affinity_ratio -> 
            [meta.condition1, meta.condition2, meta, affinity_ratio]}, by: [0,1])
        .map{ condition1, condition2, meta_differential, differential, meta_affinity, affinity_ratio ->
            [meta_affinity, differential, affinity_ratio]}
    
    PREPROCESS(ch_combined)

    ch_versions = ch_versions.mix(PREPROCESS.out.versions)


    emit:


    versions = ch_versions                     // channel: [ versions.yml ]
}
