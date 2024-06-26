include { FILTER_MOTIFS                         } from "../../modules/local/fimo/filter_motifs"
include { GAWK as ADD_MISSING_COLUMNS           } from "../../modules/nf-core/gawk"
include { GNU_SORT as CONCAT_AND_SORT           } from "../../modules/nf-core/gnu/sort"
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

        ADD_MISSING_COLUMNS(enhancer_regions, [])

        ch_concat_and_sort = ADD_MISSING_COLUMNS.out.output
            .map{meta, file -> file}
            .collect()
            .map{files -> [[id: "enhancer_regions"], files]}

        CONCAT_AND_SORT(ch_concat_and_sort)

        MERGE_REGIONS(CONCAT_AND_SORT.out.sorted)

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
            ADD_MISSING_COLUMNS.out.versions,
            CONCAT_AND_SORT.out.versions,
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
