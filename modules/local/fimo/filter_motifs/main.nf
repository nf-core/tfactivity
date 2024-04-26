process FILTER_MOTIFS {

    conda 'conda-forge::python==3.9.5'
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/python:3.9--1':
        'biocontainers/python:3.9--1' }"

    input:
        tuple val(meta), path(tfs_jaspar_ids)
        path jaspar_motifs

    output:
        tuple val(meta), path("sign_motifs/*.meme"), emit: motifs
        path "versions.yml",                         emit: versions

    script:
    template "filter_motifs.py"

    stub:
    """
    touch motifs.meme
    """
}
