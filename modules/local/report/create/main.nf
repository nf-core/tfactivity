process  {
    tag "$meta.id"
    label "process_low"

    conda "conda-forge::nodejs"
    container "docker.io/node:20.9.0-bookworm"

    script:
    """
    
    """
}