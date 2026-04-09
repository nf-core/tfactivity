process TFLINK_ANNOTATE {
    tag "${meta.id}"
    label "process_single"

    conda "${moduleDir}/environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/c5/c59e6f0f9a6959e3755f422836b3d77a592d3be0a4e7a1798fd2d4aa8e10a874/data'
        : 'community.wave.seqera.io/library/gtfparse_pandas_pyyaml:10fc85c2e9b77f0d'}"

    input:
    tuple val(meta), path(tf_ranking), path(tg_ranking)
    path tflink_file

    output:
    tuple val(meta), path("*.tf_ranking.tsv"), emit: tf_ranking
    tuple val(meta), path("*.tg_ranking.tsv"), emit: tg_ranking
    tuple val(meta), path("*.tflink_edges.tsv"), emit: edge_annotations
    tuple val(meta), path("*.tflink_summary.tsv"), emit: summary
    path "versions.yml", emit: versions

    script:
    template("annotate.py")

    stub:
    """
    cp ${tf_ranking} ${meta.id}.tflink.tf_ranking.tsv
    cp ${tg_ranking} ${meta.id}.tflink.tg_ranking.tsv

    cat <<-END_EDGES > ${meta.id}.tflink_edges.tsv
    tf\ttarget_gene\tscore\ttflink_supported\ttflink_match_type\ttflink_evidence_scope\ttflink_source_count\ttflink_sources
    END_EDGES

    cat <<-END_SUMMARY > ${meta.id}.tflink_summary.tsv
    assay\ttflink_total_edges\ttflink_supported_edges\ttflink_support_rate
    ${meta.id}\t0\t0\t0.0
    END_SUMMARY

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pandas: \$(python3 -c "import pandas; print(pandas.__version__)")
        yaml: \$(python3 -c "import yaml; print(yaml.__version__)")
    END_VERSIONS
    """
}
