process REPORT_PREPROCESS {
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/7c/7c256e63e08633ac420692d3ceec1f554fe4fcc794e5bdd331994f743096a46d/data'
        : 'community.wave.seqera.io/library/pandas_pyyaml:c0acbb47d05e4f9c'}"

    input:
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
    path regression_coefficients, stageAs: 'regression_coefficients/'
    path summary_params
    path versions
    path methods_description_meta

    output:
    path "metadata.json", emit: metadata
    path "params.json", emit: params
    path "overview.json", emit: overview
    path "transcription_factors", emit: transcription_factors

    script:
    template("preprocess.py")
}
