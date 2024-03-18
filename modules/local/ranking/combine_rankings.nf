process COMBINE_RANKINGS {
    tag "$meta.id"
    label "process_single"

    conda "bioconda::mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4==c5c6cff7c28d3260400f938602ee600b1acf0323-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4:c5c6cff7c28d3260400f938602ee600b1acf0323-0':
        'biocontainers/mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4:c5c6cff7c28d3260400f938602ee600b1acf0323-0' }"

    input:
    tuple val(meta), path(rankings)

    output:
    tuple val(meta), path("combined.ranking.tsv"), emit: ranking

    path  "versions.yml"                  , emit: versions

    script:
    """
    combine_rankings.py --input ${rankings} --output combined.ranking.tsv

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python --version | sed 's/Python //g')
        pandas: \$(python -c "import pandas; print(pandas.__version__)")
        numpy: \$(python -c "import numpy; print(numpy.__version__)")
    END_VERSIONS
    """
}
