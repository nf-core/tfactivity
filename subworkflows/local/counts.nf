include { COMBINE_COUNTS } from "../../modules/local/counts/combine"
include { CALCULATE_TPM } from "../../modules/local/counts/calculate_tpm"
include { FILTER_GENES } from "../../modules/local/counts/filter_genes"
include { FILTER_GENES as FILTER_TFS } from "../../modules/local/counts/filter_genes"
include { PREPARE_DESIGN } from "../../modules/local/counts/prepare_design"
include { DESEQ2_DIFFERENTIAL } from "../../modules/nf-core/deseq2/differential"

workflow COUNTS {

    take:
    ch_gene_lengths
    gene_map
    ch_counts
    ch_extra_counts
    ch_counts_design
    min_count
    min_tpm
    contrasts
    agg_method
    min_count_tf
    min_tpm_tf

    main:

    ch_versions = Channel.empty()



    COMBINE_COUNTS(
        ch_counts.map{counts -> [[id: "counts"], counts]},
        ch_extra_counts.map{ meta, file -> [meta.id, file] }
                        .reduce([[], []]) { accum, it -> [accum[0] + [it[0]], accum[1] + [it[1]]] },
        gene_map,
        agg_method
    )

    CALCULATE_TPM(
        COMBINE_COUNTS.out.counts,
        ch_gene_lengths,
        gene_map
    )

    FILTER_GENES(
        COMBINE_COUNTS.out.counts,
        CALCULATE_TPM.out.tpm,
        min_count,
        min_tpm
    )

    FILTER_TFS(
        COMBINE_COUNTS.out.counts.map{ meta, counts -> [[id: "TFs"], counts]},
        CALCULATE_TPM.out.tpm,
        min_count_tf,
        min_tpm_tf
    )

    PREPARE_DESIGN(ch_counts_design)

    DESEQ2_DIFFERENTIAL(
        Channel.value(["condition"]).combine(contrasts)
            .map{ variable, reference, target ->
                [[id: reference + ":" + target,
                    contrast: reference + ":" + target,
                    condition1: reference,
                    condition2: target],
                    variable, reference, target]},
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
        FILTER_TFS.out.versions,
        PREPARE_DESIGN.out.versions,
        DESEQ2_DIFFERENTIAL.out.versions
    )

    emit:
    genes = FILTER_GENES.out.genes
    raw_counts = FILTER_GENES.out.counts
    tfs = FILTER_TFS.out.genes
    tpms = CALCULATE_TPM.out.tpm
    normalized = DESEQ2_DIFFERENTIAL.out.normalised_counts
    differential = DESEQ2_DIFFERENTIAL.out.results

    versions = ch_versions                     // channel: [ versions.yml ]
}
