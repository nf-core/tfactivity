include { COMBINE_COUNTS } from "../../modules/local/counts/combine"
include { CALCULATE_TPM } from "../../modules/local/counts/calculate_tpm"
include { FILTER_GENES } from "../../modules/local/counts/filter_genes"

workflow COUNTS {

    take:
    ch_gene_lengths
    gene_map
    ch_counts
    ch_counts_design
    min_count
    min_tpm

    main:

    ch_versions = Channel.empty()

    ch_extra_counts = ch_counts_design.splitCsv(header:true)
                            .filter{it["counts_file"]}
                            .map{it["counts_file"]}.collect()

    COMBINE_COUNTS(
        ch_counts.combine(ch_counts_design).map{counts, design -> [[id: "counts"], counts, design]},
        ch_extra_counts,
        gene_map
    )

    CALCULATE_TPM(
        COMBINE_COUNTS.out.counts,
        ch_gene_lengths
    )

    FILTER_GENES(
        COMBINE_COUNTS.out.counts,
        CALCULATE_TPM.out.tpm,
        min_count,
        min_tpm
    )

    versions = ch_versions.mix(
        COMBINE_COUNTS.out.versions,
        CALCULATE_TPM.out.versions,
        FILTER_GENES.out.versions
    )

    emit:
    genes = COMBINE_COUNTS.out.genes

    versions = ch_versions                     // channel: [ versions.yml ]
}
