include { COMBINE_COUNTS } from "../../modules/local/counts/combine"
include { CALCULATE_TPM } from "../../modules/local/counts/calculate_tpm"
include { FILTER_GENES } from "../../modules/local/counts/filter_genes"
include { PREPARE_DESIGN } from "../../modules/local/counts/prepare_design"
include { DESEQ2_DIFFERENTIAL } from "../../modules/nf-core/deseq2/differential/main"

workflow COUNTS {

    take:
    ch_gene_lengths
    gene_map
    ch_counts
    ch_counts_design
    min_count
    min_tpm
    contrasts

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

    PREPARE_DESIGN(ch_counts_design.map{ design -> [[id: "design"], design]})

    DESEQ2_DIFFERENTIAL(
        Channel.value(["condition"]).combine(contrasts)
            .map{ variable, reference, target -> 
                [[id: reference + ":" + target], variable, reference, target]},
        PREPARE_DESIGN.out.design
            .map{ meta, design -> design }
            .combine(FILTER_GENES.out.counts)
        .map{design, meta, counts -> [meta, design, counts]}.collect(),
        [[], []],
        [[], []]
    )

    versions = ch_versions.mix(
        COMBINE_COUNTS.out.versions,
        CALCULATE_TPM.out.versions,
        FILTER_GENES.out.versions,
        PREPARE_DESIGN.out.versions,
        DESEQ2_DIFFERENTIAL.out.versions
    )

    emit:
    genes = FILTER_GENES.out.genes
    raw_counts = FILTER_GENES.out.counts
    tpms = CALCULATE_TPM.out.tpm
    normalized = DESEQ2_DIFFERENTIAL.out.normalised_counts
    differential = DESEQ2_DIFFERENTIAL.out.results

    versions = ch_versions                     // channel: [ versions.yml ]
}
