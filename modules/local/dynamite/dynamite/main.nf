process DYNAMITE_DYNAMITE {
    tag "$meta.id"
    label "process_medium"

    conda "environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/ba/ba128167e23ef40f22f1a06b2d1dc8aa751b3c1933f9095f895f049f4ca57189/data':
        'community.wave.seqera.io/library/r-domc_r-ggplot2_r-glmnet_r-gplots:9f264360304d527c' }"

    input:
    tuple val(meta), path(data, stageAs: "input/classification.tsv")
    val(ofolds)
    val(ifolds)
    val(alpha)
    val(randomize)

    output:
    tuple val(meta), path("${prefix}_regression_coefficients.txt"), emit: regression_coefficients
    path "versions.yml", emit: versions

    script:
    prefix = task.ext.prefix ?: "${meta.id}_dynamite"
    """
    DYNAMITE.R \\
        --dataDir=input \\
        --outDir="${meta.id}_dynamite" \\
        --out_var="Expression" \\
        --Ofolds=$ofolds \\
        --Ifolds=$ifolds \\
        --alpha=$alpha \\
        --performance=TRUE \\
        --randomise=$randomize \\
        --cores=$task.cpus

    mv ${meta.id}_dynamite/Regression_Coefficients_Entire_Data_Set_classification.txt ${prefix}_regression_coefficients.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        DYNAMITE: 1.0
    END_VERSIONS
    """

    stub:
    prefix = task.ext.prefix ?: "${meta.id}_dynamite"
    """
    touch ${prefix}_regression_coefficients.txt

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        DYNAMITE: 1.0
    END_VERSIONS
    """
}
