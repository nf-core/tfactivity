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
    path overview
    path transcription_factors
    path candidate_regions
    path gene_locations
    path target_genes

    output:
    tuple val(meta), path("report")

    script:
    def build_dir = "build"
    def assets_dir = "$build_dir/src/assets"
    """
    cp -Lr $report_dir $build_dir
    cp -L $metadata $assets_dir/metadata.json
    cp -L $parameters $assets_dir/params.json
    cp -L $overview $assets_dir/overview.json
    cp -L $candidate_regions $assets_dir/candidate_regions.json
    cp -L $gene_locations $assets_dir/gene_locations.json
    cp -Lr $target_genes $assets_dir/target_genes
    cp -Lr $transcription_factors $assets_dir/transcription_factors

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
