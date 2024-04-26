process COMBINE_RESULTS {
    label 'process_single'

    conda 'conda-forge::python==3.9.5'
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/python:3.9--1':
        'biocontainers/python:3.9--1' }"

    input:
        path motif_files

    output:
        path "fimo.tsv",     emit: tsv
        path "fimo.gff",     emit: gff
        path "versions.yml", emit: versions

    script:
    motif_files = motif_files.join(",")
    template "combine_results.py"

    stub:
    """
    touch fimo.tsv
    touch fimo.gff
    """
}
