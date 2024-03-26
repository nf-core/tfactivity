process ROSE {
    tag "$meta.id"
    label 'process_single'

    conda "conda-forge::mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6==fccb0c41a243c639e11dd1be7b74f563e624fcca-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6:fccb0c41a243c639e11dd1be7b74f563e624fcca-0':
        'biocontainers/mulled-v2-2076f4a3fb468a04063c9e6b7747a630abb457f6:fccb0c41a243c639e11dd1be7b74f563e624fcca-0' }"

    input:
    tuple val(meta), path(gff)
    path ucsc_file

    output:
    tuple val(meta), path("${gff.baseName}_STITCHED.gff")

    script:
    """
    rose.py \
    -g ${ucsc_file} \
    -i ${gff} \
    -o ${gff.baseName}_STITCHED.gff \
    -s 12500 \
    -t 2500
    """

    stub:
    """
    touch "${gff.baseName}_STITCHED.gff"
    """
}
