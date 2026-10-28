process REPORT_PREPROCESS {
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/c5/c59e6f0f9a6959e3755f422836b3d77a592d3be0a4e7a1798fd2d4aa8e10a874/data'
        : 'community.wave.seqera.io/library/gtfparse_pandas_pyyaml:10fc85c2e9b77f0d'}"

    input:
    tuple val(meta), path(gtf)
    path tf_rankings, stageAs: 'tf_rankings/'
    path tg_rankings, stageAs: 'tg_rankings/'
    path deseq2_differential, stageAs: 'deseq2_differential/'
    path raw_counts, stageAs: 'raw_counts/'
    path normalized, stageAs: 'normalized/'
    path tpms, stageAs: 'tpms/'
    path counts_design
    path affinity_sum, stageAs: 'affinity_sum/'
    path affinity_ratio, stageAs: 'affinity_ratio/'
    path affinities, stageAs: 'affinities/'
    path candidate_regions, stageAs: 'candidate_regions/'
    path regression_coefficients, stageAs: 'regression_coefficients/'
    path fimo_binding_sites, stageAs: 'fimo_binding_sites/'
    path summary_params
    path versions
    path methods_description_meta

    output:
    path "metadata.json", emit: metadata
    path "params.json", emit: params
    path "overview.json", emit: overview
    path "transcription_factors", emit: transcription_factors
    path "candidate_regions.json", emit: candidate_regions
    path "gene_locations.json", emit: gene_locations
    path "target_genes", emit: target_genes

    script:
    template("preprocess.py")
}
