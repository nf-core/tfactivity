include { FILTER_MOTIFS                         } from "../../modules/local/fimo/filter_motifs"
include { BEDTOOLS_GETFASTA as EXTRACT_SEQUENCE } from "../../modules/nf-core/bedtools/getfasta"
include { RUN_FIMO                              } from "../../modules/local/fimo/run_fimo"
include { COMBINE_RESULTS                       } from "../../modules/local/fimo/combine_results"

workflow FIMO {

    take:
        fasta
        tf_ranking
        enhancer_regions
        motifs_meme

    main:
        ch_versions = Channel.empty()

        FILTER_MOTIFS(tf_ranking, motifs_meme)

        EXTRACT_SEQUENCE(enhancer_regions, fasta.map{meta, fasta -> fasta})

        ch_filtered_motifs = FILTER_MOTIFS.out.motifs
            .flatten()
            .filter(Path)
            .map{file -> [[motif: file.baseName], file]}

        ch_fimo = EXTRACT_SEQUENCE.out.fasta.combine(ch_filtered_motifs)
            .map{
                meta1, fasta, meta2, motif ->
                [
                    [
                        id: meta1.id + '_' + meta2.motif,
                        condition: meta1.condition,
                        assay: meta1.assay,
                        motif: meta2.motif
                    ], fasta, motif
                ]
            }

        RUN_FIMO(ch_fimo)

        ch_combine_results = RUN_FIMO.out.results
            .map{meta, result -> [[id: meta.condition + '_' + meta.assay], result]}
            .groupTuple()

        COMBINE_RESULTS(ch_combine_results)

        ch_versions = ch_versions.mix(
            FILTER_MOTIFS.out.versions,
            EXTRACT_SEQUENCE.out.versions,
            RUN_FIMO.out.versions,
            COMBINE_RESULTS.out.versions
        )

    emit:
        tsv = COMBINE_RESULTS.out.tsv
        gff = COMBINE_RESULTS.out.gff
        versions = ch_versions
}
