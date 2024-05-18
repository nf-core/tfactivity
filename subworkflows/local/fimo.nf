include { JASPAR_MAPPING                        } from "../../modules/local/fimo/jaspar_mapping/main"
include { FILTER_MOTIFS                         } from "../../modules/local/fimo/filter_motifs/main"
include { CAT_CAT as CONCAT_BEDS                } from "../../modules/nf-core/cat/cat/main"
include { BEDTOOLS_SORT as SORT_REGIONS         } from "../../modules/nf-core/bedtools/sort/main"
include { BEDTOOLS_MERGE as MERGE_REGIONS       } from "../../modules/nf-core/bedtools/merge/main"
include { BEDTOOLS_GETFASTA as EXTRACT_SEQUENCE } from "../../modules/nf-core/bedtools/getfasta/main"
include { RUN_FIMO                              } from "../../modules/local/fimo/run_fimo/main"
include { COMBINE_RESULTS                       } from "../../modules/local/fimo/combine_results/main"

workflow FIMO {

    take:
        fasta
        tf_ranking
        enhancer_regions
        pwm
        motifs_meme

    main:
        ch_versions = Channel.empty()

        JASPAR_MAPPING(tf_ranking, pwm)

        FILTER_MOTIFS(JASPAR_MAPPING.out.jaspar_ids, motifs_meme)

        ch_cat_input = enhancer_regions
            .map{meta, file -> file}
            .collect()
            .map{files -> [[id: "enhancer_regions"], files]}

        CONCAT_BEDS(ch_cat_input)

        SORT_REGIONS(CONCAT_BEDS.out.file_out, [])

        MERGE_REGIONS(SORT_REGIONS.out.sorted)

        ch_bed = MERGE_REGIONS.out.bed.map{meta, bed -> bed}

        EXTRACT_SEQUENCE(ch_bed, fasta.map{meta, fasta -> fasta})

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
            JASPAR_MAPPING.out.versions,
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
