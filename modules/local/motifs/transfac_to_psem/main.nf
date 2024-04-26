process TRANSFAC_TO_PSEM {
    tag "$meta.id"
    label "process_single"
    
    conda "${moduleDir}/environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/ubuntu:20.04' :
        'nf-core/ubuntu:20.04' }"

    input:
    tuple val(meta), path(transfac)
    
    output:
    tuple val(meta), path("*.psem")
    
    script:
    """
    g++ ${moduleDir}/convert.cpp -o convert
    ./convert ${transfac} > ${meta.id}.psem
    """
}