process RUN_SNEEP {
    tag "${meta.id}"
    label "process_single"

    conda "${moduleDir}/environment.yml"
    container "${workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container
        ? 'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/da/daf2636f21fbd6af7044129ec29ccc74a40eb8e9ea919f11fafd27e3ec975c52/data'
        : 'community.wave.seqera.io/library/sneep:1.1--88e47fdf49cdd5a3'}"

    input:
    tuple val(meta), path(snp_file)
    path motifs_transfac
    path genome_fasta
    path scale_file

    output:
    tuple val(meta), path("sneep_${meta.id}/PFMs/*.txt"), emit: pfms, optional: true
    tuple val(meta), path("sneep_${meta.id}/InDels.bed"), emit: indels
    tuple val(meta), path("sneep_${meta.id}/info.txt"), emit: info
    tuple val(meta), path("sneep_${meta.id}/motifInfo.txt"), emit: motifinfo
    tuple val(meta), path("sneep_${meta.id}/notConsideredSNPs.txt"), emit: notconsideredsnps
    tuple val(meta), path("sneep_${meta.id}/result.txt"), emit: result
    tuple val(meta), path("sneep_${meta.id}/snpRegions.bed"), emit: snpregions_bed
    tuple val(meta), path("sneep_${meta.id}/snpRegions.fa"), emit: snpregions_fa
    tuple val(meta), path("sneep_${meta.id}/snpsRegions_notUniq_sorted.bed"), emit: snpsregions_notuniq_sorted
    tuple val(meta), path("sneep_${meta.id}/snpsRegions_notUniq.bed"), emit: snpsregions_notuniq
    tuple val(meta), path("sneep_${meta.id}/SNPsUnique.bed"), emit: snpsunique
    tuple val(meta), path("sneep_${meta.id}/sortedSNPsNotUnique.txt"), emit: sortedsnpsnotunique
    tuple val(meta), path("sneep_${meta.id}/TF_count.txt"), emit: tf_count
    path "versions.yml", emit: versions

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
    mkdir -p sneep_${meta.id}/PFMs/
    touch sneep_${meta.id}/PFMs/test.txt
    touch sneep_${meta.id}/InDels.bed
    touch sneep_${meta.id}/info.txt
    touch sneep_${meta.id}/motifInfo.txt
    touch sneep_${meta.id}/notConsideredSNPs.txt
    touch sneep_${meta.id}/result.txt
    touch sneep_${meta.id}/snpRegions.bed
    touch sneep_${meta.id}/snpRegions.fa
    touch sneep_${meta.id}/snpsRegions_notUniq_sorted.bed
    touch sneep_${meta.id}/snpsRegions_notUniq.bed
    touch sneep_${meta.id}/SNPsUnique.bed
    touch sneep_${meta.id}/sortedSNPsNotUnique.txt
    touch sneep_${meta.id}/TF_count.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        sneep: 1.1
    END_VERSIONS
    """
}
