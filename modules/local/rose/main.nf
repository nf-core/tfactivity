process ROSE {
    tag "$meta.id"
    label 'process_single'

    conda "conda-forge::mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6==fccb0c41a243c639e11dd1be7b74f563e624fcca-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6:fccb0c41a243c639e11dd1be7b74f563e624fcca-0':
        'biocontainers/mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6:fccb0c41a243c639e11dd1be7b74f563e624fcca-0' }"

    input:
    tuple val(meta), path(bed)
    path ucsc_file

    output:
    tuple val(meta), path("${meta.id}.rose.bed"), emit: stitched
    path("versions.yml")                        , emit: versions

    script:
    stitch = 12500
    tss_dist = 2500
    template "rose.py"

    stub:
    """
    touch "${meta.id}.rose.bed"
    """
}
