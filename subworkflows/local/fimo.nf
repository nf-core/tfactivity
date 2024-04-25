include { JASPAR_MAPPING                        } from "../../modules/local/fimo/jaspar_mapping/main"
include { JASPAR_DOWNLOAD                       } from "../../modules/local/fimo/jaspar_download/main"
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

    main:
        JASPAR_MAPPING(tf_ranking, pwm)

        JASPAR_DOWNLOAD()

        FILTER_MOTIFS(JASPAR_MAPPING.out, JASPAR_DOWNLOAD.out)

        ch_cat_input = enhancer_regions
            .map{
                meta, file -> file
            }
            .collect()
            .map{
                item -> [[id: "enhancer_regions"], item]
            }

        CONCAT_BEDS(ch_cat_input)

        SORT_REGIONS(CONCAT_BEDS.out.file_out, [])

        MERGE_REGIONS(SORT_REGIONS.out.sorted)

        ch_bed = MERGE_REGIONS.out.bed.map{meta, bed -> bed}

        EXTRACT_SEQUENCE(ch_bed, fasta)

        ch_filtered_motifs = FILTER_MOTIFS.out
            .flatten()
            .filter(Path)
            .map{file -> [[motif: file.baseName], file]}

        RUN_FIMO(ch_filtered_motifs, EXTRACT_SEQUENCE.out.fasta)

        ch_combine_results = RUN_FIMO.out
            .map{meta, path -> path}
            .collect()

        COMBINE_RESULTS(ch_combine_results)

    emit:
        tsv = COMBINE_RESULTS.out.tsv
        gff = COMBINE_RESULTS.out.gff
}
