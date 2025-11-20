process FILTER_SCALES_MOTIFS {
    label "process_single"

    conda "${moduleDir}/environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/7c/7c256e63e08633ac420692d3ceec1f554fe4fcc794e5bdd331994f743096a46d/data'
        : 'community.wave.seqera.io/library/pandas_pyyaml:c0acbb47d05e4f9c'}"

    input:
    path motifs_transfac
    path scale_file
    path motif_regions

    output:
    path "filtered_${motifs_transfac}", emit: transfac
    path "filtered_${scale_file}", emit: scale_file
    path "versions.yml", emit: versions

    script:
    template('filter_scales_motifs.py')

    stub:
    """
    touch filtered_${motifs_transfac}
    touch filtered_${scale_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pandas: \$(python3 -c "import pandas; print(pandas.__version__)")
        yaml: \$(python3 -c "import yaml; print(yaml.__version__)")
    END_VERSIONS
    """
}
