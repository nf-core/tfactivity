process STARE {
    tag "$meta.id"
    label 'process_high'

    conda "environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/13/131d4d3e84c3a947d60bcf833b714f0af91007e9532f7d8421eb52e5a006dcd2/data' :
        'community.wave.seqera.io/library/stare-abc:1.0.5--fd37836c16678a24' }"

    input:
    tuple val(meta), path(candidate_regions)
    tuple val(meta2), path(fasta)
    tuple val(meta3), path(gtf)
    path(blacklist)
    tuple val(meta4), path(pwms)
    val(window_size)
    val(decay)

    output:
    tuple val(meta), path("${meta.id}/Gene_TF_matrices/${meta.id}_TF_Gene_Affinities.txt"), emit: affinities
    path  "versions.yml"           , emit: versions

    script:
    """
    STARE.sh -c ${task.cpus} -a ${gtf} -g ${fasta} -p ${pwms} -b ${candidate_regions} -w ${window_size} -x ${blacklist} -e ${decay} -o ${meta.id}
    gzip -fd ${meta.id}/Gene_TF_matrices/${meta.id}_TF_Gene_Affinities.txt.gz

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        STARE: \$( STARE.sh --version )
    END_VERSIONS
    """

    stub:
    """
    mkdir -p ${meta.id}/Gene_TF_matrices
    touch ${meta.id}/Gene_TF_matrices/${meta.id}_TF_Gene_Affinities.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        STARE: \$( STARE.sh --version )
    END_VERSIONS
    """
}
