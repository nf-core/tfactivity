process GTFTOOLS_LENGTH {
    tag "$meta.id"
    label 'process_single'

    conda "bioconda::gtftools=0.9.0-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/gtftools:0.9.0--pyh5e36f6f_0':
        'biocontainers/gtftools:0.9.0--pyh5e36f6f_0' }"

    input:
    tuple val(meta), path(gtf)

    output:
    tuple val(meta), path("${prefix}.${suffix}"), emit: lengths
    path "versions.yml"                     , emit: versions

    when:
    task.ext.when == null || task.ext.when

    script:
    prefix = task.ext.prefix ?: "${meta.id}"
    suffix = task.ext.suffix ?: "txt"
    """
    gtftools \\
        -l ${prefix}.${suffix} \\
        $gtf

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        gtftools: \$(gtftools -v | sed 's/GTFtools version://')
    END_VERSIONS
    """

    stub:
    prefix = task.ext.prefix ?: "${meta.id}"
    suffix = task.ext.suffix ?: "txt"
    """
    touch ${prefix}.${suffix}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        gtftools: \$(gtftools -v | sed 's/GTFtools version://')
    END_VERSIONS
    """
}
