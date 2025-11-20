include { FILTER_MOTIFS                         } from "../../../modules/local/fimo/filter_motifs"
include { BEDTOOLS_GETFASTA as EXTRACT_SEQUENCE } from "../../../modules/nf-core/bedtools/getfasta"
include { RUN_FIMO                              } from "../../../modules/local/fimo/run_fimo"
include { GAWK as CONCAT_FILTER_GFF             } from "../../../modules/nf-core/gawk"
include { GNU_SORT as SORT_GFF                  } from "../../../modules/nf-core/gnu/sort"
include { GAWK as CONCAT_FILTER_TSV             } from "../../../modules/nf-core/gawk"
include { CSVTK_SORT as SORT_TSV                } from '../../../modules/nf-core/csvtk/sort'
include { GAWK as SELECT_SIGNIFICANT            } from "../../../modules/nf-core/gawk"

workflow FIMO {
    take:
    fasta
    tf_ranking
    candidate_regions
    motifs_meme

    main:
    ch_versions = Channel.empty()

    FILTER_MOTIFS(tf_ranking, motifs_meme)
    ch_versions = ch_versions.mix(FILTER_MOTIFS.out.versions)

    EXTRACT_SEQUENCE(candidate_regions, fasta.map { _meta, f -> f })
    ch_versions = ch_versions.mix(EXTRACT_SEQUENCE.out.versions)

    ch_filtered_motifs = FILTER_MOTIFS.out.motifs
        .flatten()
        .filter(Path)
        .map { file -> [[motif: file.baseName], file] }

    ch_fimo = EXTRACT_SEQUENCE.out.fasta
        .combine(ch_filtered_motifs)
        .map { meta1, f, meta2, motif ->
            [
                [
                    id: meta1.id + '_' + meta2.motif,
                    condition: meta1.condition,
                    assay: meta1.assay,
                    motif: meta2.motif,
                ],
                f,
                motif,
            ]
        }

    RUN_FIMO(ch_fimo)
    ch_versions = ch_versions.mix(RUN_FIMO.out.versions)

    // Concat per condition_assay and remove comments and empty lines
    CONCAT_FILTER_GFF(
        RUN_FIMO.out.gff.map { meta, gff -> [[id: meta.condition + '_' + meta.assay], gff] }.groupTuple(),
        [],
        []
    )
    ch_versions = ch_versions.mix(CONCAT_FILTER_GFF.out.versions)

    SORT_GFF(CONCAT_FILTER_GFF.out.output)
    ch_versions = ch_versions.mix(SORT_GFF.out.versions)

    // Concat per condition_assay and remove comments and empty lines
    CONCAT_FILTER_TSV(
        RUN_FIMO.out.tsv.map { meta, tsv -> [[id: meta.condition + '_' + meta.assay], tsv] }.groupTuple(),
        [],
        []
    )
    ch_versions = ch_versions.mix(CONCAT_FILTER_TSV.out.versions)

    SORT_TSV(CONCAT_FILTER_TSV.out.output, 'tsv', 'tsv')
    ch_versions = ch_versions.mix(SORT_TSV.out.versions)

    SELECT_SIGNIFICANT(SORT_TSV.out.sorted, [], false)
    ch_versions = ch_versions.mix(SELECT_SIGNIFICANT.out.versions)

    emit:
    gff             = SORT_GFF.out.sorted
    tsv             = SORT_TSV.out.sorted
    tsv_significant = SELECT_SIGNIFICANT.out.output
    versions        = ch_versions
}
