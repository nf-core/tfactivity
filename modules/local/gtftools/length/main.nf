process GTFTOOLS_LENGTH {
    tag "$meta.id"
    label 'process_single'

    conda "bioconda:gtftools=0.9.0-0"
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
    def args = task.ext.args ?: ''
    
    // TODO nf-core: A stub section should mimic the execution of the original module as best as possible
    //               Have a look at the following examples:
    //               Simple example: https://github.com/nf-core/modules/blob/818474a292b4860ae8ff88e149fbcda68814114d/modules/nf-core/bcftools/annotate/main.nf#L47-L63
    //               Complex example: https://github.com/nf-core/modules/blob/818474a292b4860ae8ff88e149fbcda68814114d/modules/nf-core/bedtools/split/main.nf#L38-L54
    """
    touch ${prefix}.${suffix}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        gtftools: \$(gtftools -v | sed 's/GTFtools version://')
    END_VERSIONS
    """
}
