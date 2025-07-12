process LEARN_MODEL {
    tag "${meta.id}"
    label "process_high"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/04/045a8beb148e181de4d040825e4072ce10c32bb63a3a4a82475b8e67df921d84/data'
        : 'community.wave.seqera.io/library/chromhmm:1.26--fe37622ad2b6be65'}"

    input:
    tuple val(meta), path(binarized_bams, stageAs: "input/*")
    val states

    output:
    tuple val(meta), path("output/emissions_${states}.txt"), path("output/*_${states}_dense.bed"), emit: model
    path "versions.yml", emit: versions

    script:
    """
    # Organism (PLACEHOLDER) only needed for downstream analysis of ChromHMM and therefore not supplied

    ChromHMM.sh LearnModel \\
        -p ${task.cpus} \\
        input \\
        output \\
        ${states} \\
        PLACEHOLDER \\
        -Xmx${task.memory.toMega()}M

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        chromhmm: \$(ChromHMM.sh Version | cut -f4 -d" ")
    END_VERSIONS
    """

    stub:
    """
    mkdir -p output

    # Create files for each state

    touch output/condition1_${states}_dense.bed
    touch output/condition2_${states}_dense.bed
    touch output/emissions_${states}.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        chromhmm: \$(ChromHMM.sh Version | cut -f4 -d" ")
    END_VERSIONS
    """
}
