include { ROSE as RUN_ROSE           } from "../../modules/local/rose"
include { UCSC_GTFTOGENEPRED              } from "../../modules/nf-core/ucsc/gtftogenepred"

workflow ROSE {
    take:
    ch_bed
    ch_gtf

    main:

    ch_versions = Channel.empty()

    UCSC_GTFTOGENEPRED(ch_gtf)
    RUN_ROSE(ch_bed, UCSC_GTFTOGENEPRED.out.genepred)

    ch_versions = ch_versions.mix(RUN_ROSE.out.versions)
    ch_versions = ch_versions.mix(UCSC_GTFTOGENEPRED.out.versions)

    emit:
    enhancers = RUN_ROSE.out.stitched

    versions = ch_versions
}

