#!/usr/bin/env nextflow
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    nf-core/tfactivity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Github : https://github.com/nf-core/tfactivity
    Website: https://nf-co.re/tfactivity
    Slack  : https://nfcore.slack.com/channels/tfactivity
----------------------------------------------------------------------------------------
*/

nextflow.enable.dsl = 2

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT FUNCTIONS / MODULES / SUBWORKFLOWS / WORKFLOWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

include { TFACTIVITY  } from './workflows/tfactivity'
include { PIPELINE_INITIALISATION } from './subworkflows/local/utils_nfcore_tfactivity_pipeline'
include { PIPELINE_COMPLETION     } from './subworkflows/local/utils_nfcore_tfactivity_pipeline'

include { getGenomeAttribute      } from './subworkflows/local/utils_nfcore_tfactivity_pipeline'
include { PREPARE_GENOME          } from './subworkflows/local/prepare_genome'

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GENOME PARAMETER VALUES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

params.fasta     = getGenomeAttribute('fasta')
params.gtf       = getGenomeAttribute('gtf')
params.blacklist = getGenomeAttribute('blacklist')
params.pwms      = getGenomeAttribute('pwms')

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    NAMED WORKFLOWS FOR PIPELINE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//
// WORKFLOW: Run main analysis pipeline depending on type of input
//
workflow NFCORE_TFACTIVITY {

    take:
    samplesheet // channel: samplesheet read in from --input

    main:

    ch_versions = Channel.empty()

    ch_fasta = Channel.value(file(params.fasta))
    ch_gtf   = Channel.value(file(params.gtf))
    ch_blacklist = Channel.value(file(params.blacklist))
    ch_pwms  = Channel.value(file(params.pwms))
    ch_counts = Channel.value(file(params.counts))
    ch_counts_design = Channel.value(file(params.counts_design))

    //
    // SUBWORKFLOW: Prepare genome
    //
    PREPARE_GENOME (
        ch_fasta,
        ch_gtf
    )

    ch_versions = ch_versions.mix(PREPARE_GENOME.out.versions)

    //
    // WORKFLOW: Run pipeline
    //
    TFACTIVITY (
        samplesheet,
        ch_fasta,
        ch_gtf,
        ch_blacklist,
        ch_pwms,
        PREPARE_GENOME.out.gene_lengths,
        PREPARE_GENOME.out.gene_map,
        ch_counts,
        ch_counts_design,
        params.window_size,
        params.decay,
        params.merge_samples,
        params.affinity_aggregation,

        params.min_count,
        params.min_tpm,
        params.expression_aggregation,
        params.min_count_tf,
        params.min_tpm_tf,

        params.dynamite_ofolds,
        params.dynamite_ifolds,
        params.dynamite_alpha,
        params.dynamite_randomize,

        params.alpha,

        ch_versions
    )

    emit:
    multiqc_report = TFACTIVITY.out.multiqc_report // channel: /path/to/multiqc_report.html

}
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    RUN MAIN WORKFLOW
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow {

    main:

    //
    // SUBWORKFLOW: Run initialisation tasks
    //
    PIPELINE_INITIALISATION (
        params.version,
        params.help,
        params.validate_params,
        params.monochrome_logs,
        args,
        params.outdir,
        params.input
    )

    //
    // WORKFLOW: Run main workflow
    //
    NFCORE_TFACTIVITY (
        PIPELINE_INITIALISATION.out.samplesheet
    )

    //
    // SUBWORKFLOW: Run completion tasks
    //
    PIPELINE_COMPLETION (
        params.email,
        params.email_on_fail,
        params.plaintext_email,
        params.outdir,
        params.monochrome_logs,
        params.hook_url,
        NFCORE_TFACTIVITY.out.multiqc_report
    )
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    THE END
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
