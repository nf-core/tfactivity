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
    genome
    fasta
    gtf
    blacklist
    ch_motifs
    ch_taxon_id
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

    MOTIFS(
        ch_motifs,
        COUNTS.out.tfs,
        ch_taxon_id,
    )

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

    DYNAMITE(
        COUNTS.out.differential,
        PEAKS.out.affinity_ratio,
        dynamite_ofolds,
        dynamite_ifolds,
        dynamite_alpha,
        dynamite_randomize,
    )

    RANKING(
        COUNTS.out.differential,
        PEAKS.out.affinity_sum,
        DYNAMITE.out.regression_coefficients,
        alpha,
    )

    if (!params.skip_fimo) {
        FIMO(
            fasta,
            RANKING.out.tf_total_ranking,
            PEAKS.out.candidate_regions,
            MOTIFS.out.meme,
        )
        ch_versions = ch_versions.mix(FIMO.out.versions)
    }

    if (genome in ["hg38", "mm10"] && !params.skip_sneep && params.snps && !params.skip_fimo) {
        SNEEP(
            genome,
            snps,
            fasta,
            FIMO.out.gff,
        )
        ch_versions = ch_versions.mix(SNEEP.out.versions)
    }

    ch_versions = ch_versions.mix(
        COUNTS.out.versions,
        MOTIFS.out.versions,
        PEAKS.out.versions,
        DYNAMITE.out.versions,
        RANKING.out.versions,
    )

    //
    // Collate and save software versions
    //
    softwareVersionsToYAML(ch_versions).collectFile(
        storeDir: "${params.outdir}/pipeline_info",
        name: 'nf_core_' + 'tfactivity_software_' + 'versions.yml',
        sort: true,
        newLine: true,
    )

    emit:
    versions = ch_versions // channel: [ path(versions.yml) ]
}
