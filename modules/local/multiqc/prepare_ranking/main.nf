process PREPARE_RANKING {
    tag "$meta.id"
    label 'process_single'

    conda "conda-forge::pandas==1.5.2"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/pandas:1.5.2':
        'biocontainers/pandas:1.5.2' }"

    input:
    tuple val(meta), val(assays), path(assay_paths)

    output:
    path("*_mqc.*")    , emit: multiqc_files
    path "versions.yml", emit: versions

    script:
    template "prepare_ranking.py"
}
