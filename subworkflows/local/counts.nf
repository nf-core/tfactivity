include { COMBINE_COUNTS } from "../../modules/local/counts/combine"

workflow COUNTS {

    take:
    ch_gene_lengths
    ch_counts
    ch_counts_design

    main:

    ch_versions = Channel.empty()

    ch_extra_counts = ch_counts_design.splitCsv(header:true)
                            .filter{it["counts_file"]}
                            .map{it["counts_file"]}.collect()

    COMBINE_COUNTS(
        ch_counts.combine(ch_counts_design).map{counts, design -> [[id: "counts"], counts, design]},
        ch_extra_counts
    )

    ch_combined_counts = COMBINE_COUNTS.out.counts

    versions = ch_versions.mix(COMBINE_COUNTS.out.versions)

    emit:
    genes = COMBINE_COUNTS.out.genes

    versions = ch_versions                     // channel: [ versions.yml ]
}