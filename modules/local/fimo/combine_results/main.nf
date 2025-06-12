process COMBINE_RESULTS {
    tag "${meta.id}"
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/7c/7c256e63e08633ac420692d3ceec1f554fe4fcc794e5bdd331994f743096a46d/data'
        : 'community.wave.seqera.io/library/pandas_pyyaml:c0acbb47d05e4f9c'}"

    input:
    tuple val(meta), path(gffs, stageAs: "?.gff"), path(tsvs, stageAs: "?.tsv")

    output:
    tuple val(meta), path("${meta.id}.tsv"), emit: tsv
    tuple val(meta), path("${meta.id}.gff"), emit: gff
    path "versions.yml", emit: versions

    script:
    template("combine_results.py")

    stub:
    """
    touch ${meta.id}.tsv
    touch ${meta.id}.gff
    touch versions.yml
    """
}
