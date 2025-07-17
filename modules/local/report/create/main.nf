process REPORT_CREATE {
    tag "${meta.id}"
    label "process_single"

    conda "environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/43/43c7b329cc3c4ce5ea033e750aec1caeb43f7129636993e346fd522a6d68bb84/data'
        : 'community.wave.seqera.io/library/nodejs:24.4.0--758d3687057162e5'}"

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

    # NPM does not work without a writable home directory
    # Leads to problems with singularity/apptainer
    mkdir -p temp
    export HOME=\$(pwd)/temp

    cd $build_dir
    npm install
    npm run build

    cd ..
    mkdir -p report
    mv $build_dir/dist/* report/
    """
}
