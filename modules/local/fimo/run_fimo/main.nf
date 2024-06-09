process RUN_FIMO {
    tag "${meta.motif}"

    conda "bioconda::meme==5.5.5--pl5321hda358d9_0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/meme:5.5.5--pl5321hda358d9_0':
        'biocontainers/meme:5.5.5--pl5321hda358d9_0' }"

    input:
        tuple val(meta),  path(motif_file)
        tuple val(meta2), path(sequence_file)

    output:
        tuple val(meta), path("fimo_${meta.motif}"), emit: results
        path "versions.yml",                         emit: versions

    script:
    """
    fimo --o fimo_${meta.motif} --max-stored-scores 1000000 ${motif_file} ${sequence_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fimo: \$( fimo -version )
    END_VERSIONS
    """

    stub:
    """
    mkdir fimo_${meta.motif}
    touch fimo_${meta.motif}/best_site.narrowPeak
    touch fimo_${meta.motif}/cisml.xml
    touch fimo_${meta.motif}/fimo.gff
    touch fimo_${meta.motif}/fimo.html
    touch fimo_${meta.motif}/fimo.tsv
    touch fimo_${meta.motif}/fimo.xml
    """
}
