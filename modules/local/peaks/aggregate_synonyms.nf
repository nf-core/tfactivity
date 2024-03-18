process AGGREGATE_SYNONYMS {
    tag "$meta.id"
    label "process_single"

    conda "bioconda::mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4==c5c6cff7c28d3260400f938602ee600b1acf0323-0"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4:c5c6cff7c28d3260400f938602ee600b1acf0323-0':
        'biocontainers/mulled-v2-cd5249a47f81a81b2e7785172c240f12497f55b4:c5c6cff7c28d3260400f938602ee600b1acf0323-0' }"

    input:
    tuple val(meta), path(affinities)
    tuple val(meta2), path(gene_map)
    val(agg_method)

    output:
    tuple val(meta), path("${meta.id}.agg_affinities.tsv"), emit: affinities

    path  "versions.yml"                                  , emit: versions

    script:
    """
    aggregate_synonyms.py --input ${affinities} --gene_map ${gene_map} --agg_method ${agg_method} --output ${meta.id}.agg_affinities.tsv

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python --version | sed 's/Python //g')
        pandas: \$(python -c "import pandas; print(pandas.__version__)")
        numpy: \$(python -c "import numpy; print(numpy.__version__)")
    END_VERSIONS
    """
}
