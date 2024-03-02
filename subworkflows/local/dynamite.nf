

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



    emit:


    versions = ch_versions                     // channel: [ versions.yml ]
}

