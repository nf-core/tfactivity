include { FILTER_MOTIFS                         } from "../../modules/local/fimo/filter_motifs"
include { CAT_CAT as CONCAT_BEDS                } from "../../modules/nf-core/cat/cat"
include { BEDTOOLS_SORT as SORT_REGIONS         } from "../../modules/nf-core/bedtools/sort"
include { BEDTOOLS_MERGE as MERGE_REGIONS       } from "../../modules/nf-core/bedtools/merge"
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

        ch_cat_input = enhancer_regions
            .map{meta, file -> file}
            .collect()
            .map{files -> [[id: "enhancer_regions"], files]}

        CONCAT_BEDS(ch_cat_input)

        SORT_REGIONS(CONCAT_BEDS.out.file_out, [])

        MERGE_REGIONS(SORT_REGIONS.out.sorted)

        EXTRACT_SEQUENCE(MERGE_REGIONS.out.bed, fasta.map{meta, fasta -> fasta})

        ch_filtered_motifs = FILTER_MOTIFS.out.motifs
            .flatten()
            .filter(Path)
            .map{file -> [[motif: file.baseName], file]}

        RUN_FIMO(ch_filtered_motifs, EXTRACT_SEQUENCE.out.fasta)

        ch_combine_results = RUN_FIMO.out.results
            .map{meta, path -> path}
            .collect()

        COMBINE_RESULTS(ch_combine_results)

        ch_versions = ch_versions.mix(
            FILTER_MOTIFS.out.versions,
            CONCAT_BEDS.out.versions,
            SORT_REGIONS.out.versions,
            MERGE_REGIONS.out.versions,
            EXTRACT_SEQUENCE.out.versions,
            RUN_FIMO.out.versions,
            COMBINE_RESULTS.out.versions
        )

    emit:
        tsv = COMBINE_RESULTS.out.tsv
        gff = COMBINE_RESULTS.out.gff
        versions = ch_versions
}
