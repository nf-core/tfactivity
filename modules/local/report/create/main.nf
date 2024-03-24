process CREATE {
    label "process_low"

    conda "bioconda::mulled-v2-ab48c38c3be93a696d7773767d9287b4a0d3bf19==e3c8a1ac0a27058d7922e8b6d02f303c30d93e3a-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/mulled-v2-ab48c38c3be93a696d7773767d9287b4a0d3bf19:e3c8a1ac0a27058d7922e8b6d02f303c30d93e3a-0':
        'biocontainers/mulled-v2-ab48c38c3be93a696d7773767d9287b4a0d3bf19:e3c8a1ac0a27058d7922e8b6d02f303c30d93e3a-0' }"

    cache false

    output:
    path("report")

    script:
    template "build.py"
}