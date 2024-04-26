process FILTER_MOTIFS {
    tag "$meta.id"
    label "process_single"

    conda "bioconda:bioconductor-universalmotif==1.20.0--r43hf17093f_0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/bioconductor-universalmotif:1.20.0--r43hf17093f_0':
        'biocontainers/bioconductor-universalmotif:1.20.0--r43hf17093f_0' }"

    input:
    tuple val(meta), path(in_file)
    tuple val(meta2), path(tfs)
    
    output:
    tuple val(meta), path("${out_file}"), emit: filtered
    path "versions.yml"                 , emit: versions
    
    script:
    out_file = "${meta.id}.filtered.RDS"
    template "filter_motifs.R"
}