/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT MODULES / SUBWORKFLOWS / FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// include { MULTIQC             } from '../modules/nf-core/multiqc/main'
include { paramsSummaryMap       } from 'plugin/nf-schema'
include { paramsSummaryMultiqc   } from '../subworkflows/nf-core/utils_nfcore_pipeline'
include { softwareVersionsToYAML } from '../subworkflows/nf-core/utils_nfcore_pipeline'
include { methodsDescriptionText } from '../subworkflows/local/utils_nfcore_tfactivity_pipeline'

include { PREPARE_GENOME         } from '../subworkflows/local/prepare_genome'
include { COUNTS                 } from '../subworkflows/local/counts'
include { MOTIFS                 } from '../subworkflows/local/motifs'
include { PEAKS                  } from '../subworkflows/local/peaks'
include { DYNAMITE               } from '../subworkflows/local/dynamite'
include { RANKING                } from '../subworkflows/local/ranking'
include { FIMO                   } from '../subworkflows/local/fimo'
include { SNEEP                  } from '../subworkflows/local/sneep'

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
    window_size
    decay
    merge_samples
    affinity_agg_method
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

    // Get conditions from the samplesheet
    ch_conditions = ch_samplesheet
        .map { meta, _peak_file -> meta.condition }
        .toSortedList()
        .flatten()
        .unique()

    // Combine conditions into contrasts
    ch_contrasts = ch_conditions
        .combine(ch_conditions)
        .filter { condition1, condition2 -> condition1 < condition2 }

    // Combine counts, convert to TPM, filter genes and TFs, run DESeq2
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
    )
    ch_versions = ch_versions.mix(MOTIFS.out.versions)

    PEAKS(
        ch_samplesheet,
        fasta,
        gtf,
        blacklist,
        MOTIFS.out.psem,
        window_size,
        decay,
        merge_samples,
        ch_contrasts,
        gene_map,
        affinity_agg_method,
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
        DYNAMITE.out.regression_coefficients,
        alpha,
    )
    ch_versions = ch_versions.mix(RANKING.out.versions)

    if (!params.skip_fimo) {
        FIMO(
            fasta,
            RANKING.out.tf_total_ranking,
            PEAKS.out.candidate_regions,
            MOTIFS.out.meme,
        )
        ch_versions = ch_versions.mix(FIMO.out.versions)
    }

    if (!params.skip_sneep) {
        if (!sneep_scale_file) {
            error "In order to run sneep, please provide a sneep scale file (--sneep_scale_file). If you set --genome to either hg38 or mm10, the sneep scale file will be automatically downloaded."
        }

        if (!sneep_motif_file) {
            error "In order to run sneep, please provide a sneep motif file (--sneep_motif_file). If you set --genome to either hg38 or mm10, the sneep motif file will be automatically downloaded."
        }

        if (!snps) {
            error "In order to run sneep, please provide a snps file (--snps). If you set --genome to either hg38 or mm10, the snps file will be automatically downloaded."
        }

        if (params.skip_fimo) {
            log.warn "Sneep can only be run if fimo is also run. If you want to run sneep, please set --skip_fimo to false."
        } else {
            SNEEP(
                snps,
                sneep_scale_file,
                sneep_motif_file,
                fasta,
                FIMO.out.gff,
            )
            ch_versions = ch_versions.mix(SNEEP.out.versions)
        }
    }

    //
    // Collate and save software versions
    //
    softwareVersionsToYAML(ch_versions).collectFile(
        storeDir: "${params.outdir}/pipeline_info",
        name: 'nf_core_tfactivity_software_versions.yml',
        sort: true,
        newLine: true,
    )

    emit:
    versions = ch_versions // channel: [ path(versions.yml) ]
}
