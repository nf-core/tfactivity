process EXTRACT_ID_SYMBOL_MAP {
    tag "${meta.id}"
    label "process_medium"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/aa/aa14cc4fee70bb6040b3f34054d64ade21b6b462550d93a164c7afcc3cd98eb2/data'
        : 'community.wave.seqera.io/library/bcbio-gff_pyyaml:00a3ccab8a9fe815'}"

    input:
    tuple val(meta), path(gtf)

    output:
    tuple val(meta), path("*.txt"), emit: id_symbol_map
    path("versions.yml")          , emit: versions

    script:
    prefix = task.ext.prefix ?: "${meta.id}"
    VERSION="0.7.1"
    template("id_symbol_map.py")

    stub:
    prefix = task.ext.prefix ?: "${meta.id}"
    VERSION="0.7.1"
    """
    touch ${prefix}.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        bcbio: "${VERSION}"
    END_VERSIONS
    """
}
