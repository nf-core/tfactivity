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
    tuple val(meta), path("${prefix}.gff"), emit: gff
    tuple val(meta), path("${prefix}.tsv"), emit: tsv
    tuple val(meta), path("${prefix}.html"), emit: html
    tuple val(meta), path("${prefix}.xml"), emit: xml
    tuple val(meta), path("${prefix}_best_site.narrowPeak"), emit: narrowPeak
    tuple val(meta), path("${prefix}_cisml.xml"), emit: cisml
    path "versions.yml", emit: versions

    script:
    prefix = task.ext.prefix ?: "${meta.id}"
    """
    fimo --max-stored-scores 1000000 ${motif_file} ${sequence_file}

    mv fimo_out/fimo.gff ${prefix}.gff
    mv fimo_out/fimo.tsv ${prefix}.tsv
    mv fimo_out/fimo.html ${prefix}.html
    mv fimo_out/fimo.xml ${prefix}.xml
    mv fimo_out/best_site.narrowPeak ${prefix}_best_site.narrowPeak
    mv fimo_out/cisml.xml ${prefix}_cisml.xml

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fimo: \$( fimo -version )
    END_VERSIONS
    """

    stub:
    prefix = task.ext.prefix ?: "${meta.id}"
    """
    touch ${prefix}_best_site.narrowPeak
    touch ${prefix}_cisml.xml
    touch ${prefix}.gff
    touch ${prefix}.html
    touch ${prefix}.tsv
    touch ${prefix}.xml

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fimo: \$( fimo -version )
    END_VERSIONS
    """
}
