/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT MODULES / SUBWORKFLOWS / FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

include { PREPARE_GENOME         } from '../subworkflows/local/prepare_genome'
include { COUNTS                 } from '../subworkflows/local/counts'
include { MOTIFS                 } from '../subworkflows/local/motifs'
include { PEAKS                  } from '../subworkflows/local/peaks'
include { DYNAMITE               } from '../subworkflows/local/dynamite'
include { RANKING                } from '../subworkflows/local/ranking'
include { FIMO                   } from '../subworkflows/local/fimo'
include { SNEEP                  } from '../subworkflows/local/sneep'
include { REPORT                 } from '../subworkflows/local/report'

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    RUN MAIN WORKFLOW
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow TFACTIVITY {
    take:
    ch_samplesheet          // channel: samplesheet read in from --input
    sneep_scale_file
    sneep_motif_file
    fasta
    gtf
    blacklist
    motifs
    taxon_id
    gene_lengths
    gene_map
    chrom_sizes
    ch_samplesheet_bam
    chromhmm_states
    chromhmm_threshold
    chromhmm_enhancer_marks
    chromhmm_promoter_marks
    merge_samples
    affinity_agg_method
    duplicate_motifs
    counts
    extra_counts
    counts_design
    min_count
    min_tpm
    expression_agg_method
    min_count_tf
    min_tpm_tf
    dynamite_ofolds
    dynamite_ifolds
    dynamite_alpha
    dynamite_randomize
    alpha
    snps
    ch_versions

    main:

    ch_versions = Channel.empty()

    ch_conditions = ch_samplesheet
        .map { meta, _peak_file -> meta.condition }
        .toSortedList()
        .flatten()
        .unique()

    ch_contrasts = ch_conditions
        .combine(ch_conditions)
        .filter { condition1, condition2 -> condition1 < condition2 }

    COUNTS(
        gene_lengths,
        gene_map,
        counts,
        extra_counts,
        counts_design,
        min_count,
        min_tpm,
        ch_contrasts,
        expression_agg_method,
        min_count_tf,
        min_tpm_tf,
    )
    ch_versions = ch_versions.mix(COUNTS.out.versions)

    MOTIFS(
        motifs,
        COUNTS.out.tfs,
        taxon_id,
        duplicate_motifs == "remove",
    )
    ch_versions = ch_versions.mix(MOTIFS.out.versions)

    PEAKS(
        ch_samplesheet,
        fasta,
        gtf,
        blacklist,
        MOTIFS.out.psem,
        merge_samples,
        ch_contrasts,
        gene_map,
        affinity_agg_method,
        duplicate_motifs == "merge",
        ch_samplesheet_bam,
        chrom_sizes,
        chromhmm_states,
        chromhmm_threshold,
        chromhmm_enhancer_marks,
        chromhmm_promoter_marks,
    )
    ch_versions = ch_versions.mix(PEAKS.out.versions)

    DYNAMITE(
        COUNTS.out.differential,
        PEAKS.out.affinity_ratio,
        dynamite_ofolds,
        dynamite_ifolds,
        dynamite_alpha,
        dynamite_randomize,
    )
    ch_versions = ch_versions.mix(DYNAMITE.out.versions)

    RANKING(
        COUNTS.out.differential,
        PEAKS.out.affinity_sum,
        DYNAMITE.out.filtered_coefficients,
        alpha,
        affinity_agg_method,
    )
    ch_versions = ch_versions.mix(RANKING.out.versions)

    ch_fimo_binding_sites = Channel.empty()

    if (!params.skip_fimo) {
        if (duplicate_motifs == "merge") {
            error "Fimo can only be run if duplicate motifs are not merged. Please set --skip_fimo true or --duplicate_motifs [remove|keep]."
        }

        FIMO(
            fasta,
            RANKING.out.tf_total_ranking,
            PEAKS.out.candidate_regions,
            MOTIFS.out.meme,
        )
        ch_versions = ch_versions.mix(FIMO.out.versions)
        ch_fimo_binding_sites = FIMO.out.tsv_significant
    }

    if (!params.skip_sneep) {
        if (!sneep_scale_file) {
            error("In order to run sneep, please provide a sneep scale file (--sneep_scale_file). If you set --genome to either hg38 or mm10, the sneep scale file will be automatically downloaded.")
        }

        if (!sneep_motif_file) {
            error("In order to run sneep, please provide a sneep motif file (--sneep_motif_file). If you set --genome to either hg38 or mm10, the sneep motif file will be automatically downloaded.")
        }

        if (!snps) {
            error("In order to run sneep, please provide a snps file (--snps). If you set --genome to either hg38 or mm10, the snps file will be automatically downloaded.")
        }

        if (params.skip_fimo) {
            error "Sneep can only be run if fimo is also run. If you want to run sneep, please set --skip_fimo to false."
        }

        SNEEP(
            snps,
            sneep_scale_file,
            sneep_motif_file,
            fasta,
            FIMO.out.gff,
        )
        ch_versions = ch_versions.mix(SNEEP.out.versions)
    }

    REPORT(
        gtf,
        RANKING.out.tf_ranking.map { _meta, ranking -> ranking }.collect(),
        RANKING.out.tg_ranking.map { _meta, ranking -> ranking }.collect(),
        COUNTS.out.differential.map { _meta, differential -> differential }.collect(),
        COUNTS.out.raw_counts.map { _meta, raw_counts -> raw_counts }.collect(),
        COUNTS.out.normalized.map { _meta, normalized -> normalized }.collect(),
        COUNTS.out.tpms.map { _meta, tpms -> tpms }.collect(),
        counts_design.map { _meta, design -> design }.collect(),
        PEAKS.out.affinity_sum.map { _meta, affinity_sum -> affinity_sum }.collect(),
        PEAKS.out.affinity_ratio.map { _meta, affinity_ratio -> affinity_ratio }.collect(),
        PEAKS.out.affinities.map { _meta, affinities -> affinities }.collect(),
        PEAKS.out.candidate_regions.map { _meta, candidate_regions -> candidate_regions }.collect(),
        DYNAMITE.out.all_coefficients.map { _meta, all_coefficients -> all_coefficients }.collect(),
        ch_fimo_binding_sites.map { _meta, fimo_binding_sites -> fimo_binding_sites }.collect(),
        ch_versions
    )

    emit:
    versions = ch_versions // channel: [ path(versions.yml) ]
}
