include { ROSE as RUN_ROSE           } from "../../modules/local/rose"

workflow ROSE {
    take:
    ch_bed
    ucsc_file

    main:

    ch_versions = Channel.empty()

    RUN_ROSE(ch_bed, ucsc_file)

    ch_versions = ch_versions.mix(RUN_ROSE.out.versions)

    emit:
    enhancers = RUN_ROSE.out.stitched

    versions = ch_versions
}

