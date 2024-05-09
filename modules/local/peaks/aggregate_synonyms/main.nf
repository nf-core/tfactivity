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
    template "aggregate_synonyms.py"
}
