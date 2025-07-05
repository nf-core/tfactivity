process REPORT_CREATE {
    tag "${meta.id}"
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/12/1288d89bc91a57e6b0362b21a3d8f2f96264bcb3da43983077a5dbad379424d7/data'
        : 'community.wave.seqera.io/library/nodejs:22.13.0--eaccf6c1415d3161'}"

    input:
    tuple val(meta), path(report_dir, stageAs: 'template')
    path metadata
    path parameters
    path ranking
    path regression_coefficients
    path transcription_factors

    output:
    tuple val(meta), path("report")

    script:
    def build_dir = "build"
    def assets_dir = "$build_dir/src/assets"
    def public_dir = "$build_dir/public"
    """
    cp -Lr $report_dir $build_dir
    cp -L $metadata $assets_dir/metadata.json
    cp -L $parameters $assets_dir/params.json
    cp -L $ranking $assets_dir/ranking.json
    cp -L $regression_coefficients $assets_dir/regression_coefficients.json
    cp -Lr $transcription_factors $public_dir/transcription_factors

    cd $build_dir
    npm install
    npm run build

    cd ..
    mkdir -p report
    mv $build_dir/dist/* report/
    """
}
