process TRANSFAC_TO_PSEM {
    tag "$meta.id"
    label "process_single"

    conda "conda-forge::pandas==1.5.2"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/pandas:1.5.2':
        'biocontainers/pandas:1.5.2' }"

    input:
    tuple val(meta), path(transfac)

    output:
    tuple val(meta), path("*.psem"), emit: psem
    path "versions.yml"            , emit: versions

    script:
    template "convert.py"

    stub:
    """
    touch ${meta.id}.psem

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        numpy: \$(python3 -c "import numpy; print(numpy.__version__)")
    END_VERSIONS
    """
}
