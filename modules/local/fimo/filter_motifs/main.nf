process FILTER_MOTIFS {

    conda 'conda-forge::python==3.9.5'
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/python:3.9--1':
        'biocontainers/python:3.9--1' }"

    input:
        tuple val(meta), path(tfs_jaspar_ids)
        tuple val(meta2), path(meme_motifs)

    output:
        tuple val(meta), path("motifs/*.meme"), emit: motifs
        path "versions.yml",                    emit: versions

    script:
    template "filter_motifs.py"

    stub:
    """
    mkdir motifs
    touch motifs/MA0778.1.meme
    touch motifs/MA0938.3.meme
    touch motifs/MA1272.1.meme
    """
}
