process STARE {
    tag "$meta.id"
    label 'process_high'

    conda "bioconda::stare-abc"
    container "biocontainers/stare-abc:1.0.4--haf6292c_1"

    input:
    tuple val(meta), path(candidate_regions)
    path(fasta)
    path(gtf)
    path(blacklist)
    path(pwms)
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
}
