/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT MODULES / SUBWORKFLOWS / FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// include { MULTIQC             } from '../modules/nf-core/multiqc/main'
include { paramsSummaryMap       } from 'plugin/nf-validation'
include { paramsSummaryMultiqc   } from '../subworkflows/nf-core/utils_nfcore_pipeline'
include { softwareVersionsToYAML } from '../subworkflows/nf-core/utils_nfcore_pipeline'
include { methodsDescriptionText } from '../subworkflows/local/utils_nfcore_tfactivity_pipeline'

include { PREPARE_GENOME         } from '../subworkflows/local/prepare_genome'
include { COUNTS                 } from '../subworkflows/local/counts'
include { PEAKS                  } from '../subworkflows/local/peaks'
include { DYNAMITE               } from '../subworkflows/local/dynamite'
include { RANKING                } from '../subworkflows/local/ranking'
include { REPORT                 } from '../subworkflows/local/report'

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    RUN MAIN WORKFLOW
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow TFACTIVITY {

    take:
    ch_samplesheet // channel: samplesheet read in from --input
    fasta
    gtf
    blacklist
    pwms
    gene_lengths
    gene_map
    counts
    counts_design
    ch_samplesheet_bam
    chrom_sizes
    chromhmm_states
    rose_ucsc

    window_size
    decay
    merge_samples
    affinity_agg_method

    // Counts
    min_count
    min_tpm
    expression_agg_method
    min_count_tf
    min_tpm_tf

    // Dynamite
    dynamite_ofolds
    dynamite_ifolds
    dynamite_alpha
    dynamite_randomize

    // Ranking
    alpha

    ch_versions

    main:

    ch_conditions = ch_samplesheet.map { meta, peak_file -> meta.condition }
                        .toSortedList().flatten().unique()

    ch_contrasts = ch_conditions.combine(ch_conditions)
                                .filter { condition1, condition2 -> condition1 < condition2 }

    COUNTS(
        gene_lengths,
        gene_map,
        counts,
        counts_design,
        min_count,
        min_tpm,
        ch_contrasts,
        expression_agg_method,
        min_count_tf,
        min_tpm_tf
    )

    PEAKS(
        ch_samplesheet,
        fasta,
        gtf,
        blacklist,
        pwms,
        window_size,
        decay,
        merge_samples,
        ch_contrasts,
        COUNTS.out.tfs,
        gene_map,
        affinity_agg_method,
        ch_samplesheet_bam,
        chrom_sizes,
        chromhmm_states,
        rose_ucsc
    )

    DYNAMITE(
        COUNTS.out.differential,
        PEAKS.out.affinity_ratio,
        dynamite_ofolds,
        dynamite_ifolds,
        dynamite_alpha,
        dynamite_randomize
    )

    RANKING(
        COUNTS.out.differential,
        PEAKS.out.affinity_sum,
        DYNAMITE.out.regression_coefficients,
        alpha
    )

    REPORT(
        RANKING.out.tf_ranking,
        RANKING.out.tg_ranking,
        COUNTS.out.differential
    )

    ch_versions = ch_versions.mix(
        COUNTS.out.versions,
        PEAKS.out.versions,
        DYNAMITE.out.versions,
        RANKING.out.versions,
        REPORT.out.versions
    )

    //
    // Collate and save software versions
    //
    softwareVersionsToYAML(ch_versions)
        .collectFile(storeDir: "${params.outdir}/pipeline_info", name: 'nf_core_pipeline_software_mqc_versions.yml', sort: true, newLine: true)
        .set { ch_collated_versions }

    emit:
    multiqc_report = Channel.empty()
    versions       = ch_versions                 // channel: [ path(versions.yml) ]
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    THE END
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
