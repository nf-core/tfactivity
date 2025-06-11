process GET_RESULTS {
    tag "$meta.id"
    label 'process_single'

    conda "environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/7c/7c256e63e08633ac420692d3ceec1f554fe4fcc794e5bdd331994f743096a46d/data':
        'community.wave.seqera.io/library/pandas_pyyaml:c0acbb47d05e4f9c' }"

    input:
    tuple val(meta), path(emissions), path(bed)
    val(threshold)
    val(marks)

    output:
    tuple val(meta), path("$output_file"), emit: regions
    path "versions.yml",                   emit: versions

    script:
    output_file = "${meta.id}.bed"
    template "get_results.py"
}
