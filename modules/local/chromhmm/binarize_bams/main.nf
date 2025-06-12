process BINARIZE_BAMS {
    tag "$meta.id"
    label "process_high"

    conda "environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/04/045a8beb148e181de4d040825e4072ce10c32bb63a3a4a82475b8e67df921d84/data' :
        'community.wave.seqera.io/library/chromhmm:1.26--fe37622ad2b6be65' }"

    input:
    tuple val(meta), path(bams, stageAs: "input/*")
    tuple val(meta2), path(table)
    tuple val(meta3), path(chromsizes)

    output:
    tuple val(meta), path("output/*_binary.txt"), emit: binarized_bams
    path "versions.yml",             emit: versions

    script:
    """
    ChromHMM.sh BinarizeBam \\
        $chromsizes \\
        input \\
        $table \\
        output \\
        -Xmx${task.memory.toMega()}M

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        chromhmm: \$(ChromHMM.sh Version | cut -f4 -d" ")
    END_VERSIONS
    """

    stub:
    """
    mkdir -p output
    touch output/condition_1_binary.txt
    touch output/condition_2_binary.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        chromhmm: \$(ChromHMM.sh Version | cut -f4 -d" ")
    END_VERSIONS
    """
}
