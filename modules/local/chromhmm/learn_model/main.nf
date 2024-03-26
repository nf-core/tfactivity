process LEARN_MODEL {
    tag "$meta.id"
    label "process_high"

    // TODO: Update OpenJDK biocontainer to version 17 (https://biocontainers.pro/tools/openjdk)
    container "registry.hub.docker.com/leonhafner/openjdk:17"

    input:
    tuple val(meta), path(binarized_bams, stageAs: "input")
    val states

    output:
    tuple val(meta), path("output/emissions_${states}.txt"), emit: emissions
    tuple val(meta), path("output/*_${states}_dense.bed")  , emit: beds

    script:
    """
    # Organism (PLACEHOLDER) only needed for downstream analysis of ChromHMM and therefore not supplied

    java -jar $moduleDir/ChromHMM.jar LearnModel \\
        -p $task.cpus \\
        input \\
        output \\
        $states \\
        PLACEHOLDER
    """
}
