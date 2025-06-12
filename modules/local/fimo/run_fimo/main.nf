process RUN_FIMO {
    tag "${meta.id}"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/e1/e1390c27b394dddec4f1d358dcae77c7de2183072c8e524e22c876c618633ace/data'
        : 'community.wave.seqera.io/library/meme:5.5.8--39b08bb5c1288a6b'}"

    input:
    tuple val(meta), path(sequence_file), path(motif_file)

    output:
    tuple val(meta), path("fimo_${meta.id}"), emit: results
    path "versions.yml", emit: versions

    script:
    """
    fimo --o fimo_${meta.id} --max-stored-scores 1000000 ${motif_file} ${sequence_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fimo: \$( fimo -version )
    END_VERSIONS
    """

    stub:
    """
    mkdir fimo_${meta.id}
    touch fimo_${meta.id}/best_site.narrowPeak
    touch fimo_${meta.id}/cisml.xml
    touch fimo_${meta.id}/fimo.gff
    touch fimo_${meta.id}/fimo.html
    touch fimo_${meta.id}/fimo.tsv
    touch fimo_${meta.id}/fimo.xml
    touch versions.yml
    """
}
