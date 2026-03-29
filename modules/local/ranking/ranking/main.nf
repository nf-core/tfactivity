process RANKING {
    tag "${meta.id}"
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/c8/c83ba0cd55bda8f49bfb910a65ceb6d9e2db4c04b2383b87b0d174df27703803/data'
        : 'community.wave.seqera.io/library/pandas_pyyaml_scipy:e3309ad753191b1b'}"

    input:
    tuple val(meta), path(tf_tg_score)
    val alpha
    val agg_method

    output:
    tuple val(meta), path("*.tf_ranking.tsv"), emit: tfs
    tuple val(meta), path("*.tg_ranking.tsv"), emit: tgs

    path "versions.yml", emit: versions

    script:
    template("ranking.py")

    stub:
    """
    touch ${meta.id}.tf_ranking.tsv
    touch ${meta.id}.tg_ranking.tsv

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pandas: \$(python3 -c "import pandas; print(pandas.__version__)")
        scipy: \$(python3 -c "import scipy; print(scipy.__version__)")
    END_VERSIONS
    """
}
