process FILTER_SCALES_MOTIFS {

    conda "${moduleDir}/environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/e8/e87c143b4e7b31e1d5db5518d5c3d0e82fe20c4a9607e668e3fc8b390257d4f7/data':
        'community.wave.seqera.io/library/pandas:2.2.3--9b034ee33172d809' }"

    input:
        path motifs_transfac
        path scale_file
        path motif_regions

    output:
        path "filtered_${motifs_transfac}", emit: transfac
        path "filtered_${scale_file}",      emit: scale_file
        path "versions.yml",                emit: versions

    script:
    template 'filter_scales_motifs.py'

    stub:
    """
    touch filtered_${motifs_transfac}
    touch filtered_${scale_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        python: \$(python3 --version | cut -f 2 -d " ")
        pandas: \$(python3 -c "import pandas; print(pandas.__version__)")
    END_VERSIONS
    """
}
