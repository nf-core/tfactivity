process RUN_SNEEP {
    tag "${meta.id}"

    conda "${moduleDir}/environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/da/daf2636f21fbd6af7044129ec29ccc74a40eb8e9ea919f11fafd27e3ec975c52/data':
        'community.wave.seqera.io/library/sneep:1.1--88e47fdf49cdd5a3' }"

    input:
        tuple val(meta), path(snp_file)
        path motifs_transfac
        path genome_fasta
        path scale_file

    output:
        tuple val(meta), path("sneep_${meta.id}"), emit: results
        path "versions.yml",                       emit: versions

    script:
    """
    differentialBindingAffinity_multipleSNPs \
    -o sneep_${meta.id}/ \
    ${motifs_transfac} \
    ${snp_file} \
    ${genome_fasta} \
    ${scale_file}

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        sneep: 1.1
    END_VERSIONS
    """

    stub:
    """
    mkdir sneep_${meta.id}
    touch sneep_${meta.id}/results.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        sneep: 1.1
    END_VERSIONS
    """
}
