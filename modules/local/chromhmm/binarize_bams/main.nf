process BINARIZE_BAMS {
	tag "$meta.id"
    label "process_high"

    // TODO: Update OpenJDK biocontainer to version 17 (https://biocontainers.pro/tools/openjdk)
    container "registry.hub.docker.com/leonhafner/openjdk:17"

    input:
    tuple val(meta), path(bams, stageAs: "input/*")
//    tuple val(meta2), path(bais)
    tuple val(meta3), path(cellmarkfiletable)
    tuple val(meta4), path(chromsizes)

    output:
    tuple val(meta), path("binarized_bams")

    script:
    """
    java -jar $moduleDir/ChromHMM.jar BinarizeBam \\
       $chromsizes \\
       input \\
       $cellmarkfiletable \\
       binarized_bams
    """
}