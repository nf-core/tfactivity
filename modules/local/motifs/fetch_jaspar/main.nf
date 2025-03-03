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
}
