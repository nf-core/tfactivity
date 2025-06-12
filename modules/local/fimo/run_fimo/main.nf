process RUN_FIMO {
    tag "${meta.id}"
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/e1/e1390c27b394dddec4f1d358dcae77c7de2183072c8e524e22c876c618633ace/data'
        : 'community.wave.seqera.io/library/meme:5.5.8--39b08bb5c1288a6b'}"

    input:
    tuple val(meta), path(sequence_file), path(motif_file)

    output:
    tuple val(meta), path("fimo_out/fimo.gff"), emit: gff
    tuple val(meta), path("fimo_out/fimo.tsv"), emit: tsv
    tuple val(meta), path("fimo_out/fimo.html"), emit: html
    tuple val(meta), path("fimo_out/fimo.xml"), emit: xml
    tuple val(meta), path("fimo_out/best_site.narrowPeak"), emit: narrowPeak
    tuple val(meta), path("fimo_out/cisml.xml"), emit: cisml
    path "versions.yml", emit: versions

    script:
    """
    fimo --max-stored-scores 1000000 ${motif_file} ${sequence_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fimo: \$( fimo -version )
    END_VERSIONS
    """

    stub:
    """
    mkdir -p fimo_out
    touch fimo_out/best_site.narrowPeak
    touch fimo_out/cisml.xml
    touch fimo_out/fimo.gff
    touch fimo_out/fimo.html
    touch fimo_out/fimo.tsv
    touch fimo_out/fimo.xml
    touch versions.yml
    """
}
