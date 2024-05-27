process JASPAR_MAPPING {
    label 'process_single'

    conda "conda-forge::pandas==1.5.2"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/pandas:1.5.2':
        'biocontainers/pandas:1.5.2' }"

    input:
        tuple val(meta), path(tf_ranking)
        tuple val(meta2), path(motifs_meme)

    output:
        tuple val(meta), path("tfs_jaspar_ids.txt"), emit: jaspar_ids
        path "versions.yml",                         emit: versions

    script:
    template "jaspar_mapping.py"

    stub:
    """
        touch tfs_jaspar_ids.txt
    """
}
