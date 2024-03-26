include { GAWK as BED_TO_GFF         } from "../../modules/nf-core/gawk"
include { GAWK as REFORMAT_GFF       } from "../../modules/nf-core/gawk"
include { ROSE as RUN_ROSE           } from "../../modules/local/rose"
include { GAWK as ROSE_OUTPUT_TO_BED } from "../../modules/nf-core/gawk"

workflow ROSE {
    take:
    ch_bed
    ucsc_file

    main:

    ch_versions = Channel.empty()

    BED_TO_GFF(ch_bed, [])
    REFORMAT_GFF(BED_TO_GFF.out.output, [])

    RUN_ROSE(REFORMAT_GFF.out.output, ucsc_file)
    ROSE_OUTPUT_TO_BED(RUN_ROSE.out, [])

    ch_versions = ch_versions.mix(BED_TO_GFF.out.versions)
    ch_versions = ch_versions.mix(REFORMAT_GFF.out.versions)
    ch_versions = ch_versions.mix(ROSE_OUTPUT_TO_BED.out.versions)

    emit:
    enhancers = ROSE_OUTPUT_TO_BED.out.output

    versions = ch_versions
}

