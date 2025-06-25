process FETCH_JASPAR {
    tag "$taxon_id"
    label "process_single"

    conda "bioconda::pyjaspar==3.0.0--pyhdfd78af_0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/pyjaspar:3.0.0--pyhdfd78af_0':
        'biocontainers/pyjaspar:3.0.0--pyhdfd78af_0' }"

    input:
    val(taxon_id)

    output:
    path("motifs.jaspar"), emit: motifs
    path "versions.yml"  , emit: versions

    script:
    template "fetch_jaspar.py"

    stub:
    """
    touch motifs.jaspar

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pyjaspar: \$(python3 -c "import pyjaspar; print(pyjaspar.__version__)")
    END_VERSIONS
    """
}
