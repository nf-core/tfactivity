process DYNAMITE {
    tag "$meta.id"
    label "process_medium"

    conda "bioconda::bedtools conda-forge::gxx conda-forge::r-base conda-forge::r-gplots conda-forge::r-ggplot2 conda-forge::r-glmnet conda-forge::r-doMC conda-forge::r-reshape2 conda-forge::r-gridExtra pandas"
    container "registry.hub.docker.com/bigdatainbiomedicine/inspect-tepic"
    // TODO: Add more nf-core-like environment definition

    input:
    tuple val(meta), path(data, stageAs: "input/classification.tsv")
    val(ofolds)
    val(ifolds)
    val(alpha)
    val(randomize)

    output:
    tuple val(meta), path("${meta.id}_dynamite/Regression_Coefficients_Entire_Data_Set_classification.txt")

    script:
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
    """
}
