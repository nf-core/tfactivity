process COMBINE_COUNTS {
    tag "$meta.id"
    label "process_single"

    conda "environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/7c/7c256e63e08633ac420692d3ceec1f554fe4fcc794e5bdd331994f743096a46d/data':
        'community.wave.seqera.io/library/pandas_pyyaml:c0acbb47d05e4f9c' }"

    input:
    tuple val(meta), path(counts)
    tuple val(samples), path(extra_files)
    tuple val(meta2), path(gene_map)
    val(agg_method)

    output:
    tuple val(meta), path("${prefix}.clean.tsv"), emit: counts
    tuple val(meta), path("genes.txt")  , emit: genes
    path  "versions.yml"                , emit: versions

    script:
    prefix = task.ext.prefix ?: meta.id
    template "combine.py"

    stub:
    prefix = task.ext.prefix ?: meta.id
    """
    touch ${prefix}.clean.tsv
    touch genes.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pandas: \$(python3 -c "import pandas; print(pandas.__version__)")
    END_VERSIONS
    """
}
