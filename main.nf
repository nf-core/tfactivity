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

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GENOME PARAMETER VALUES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

params.fasta            = getGenomeAttribute('fasta')
params.gtf              = getGenomeAttribute('gtf')
params.blacklist        = getGenomeAttribute('blacklist')
params.taxon_id         = getGenomeAttribute('taxon_id')
params.snps             = getGenomeAttribute('snps')
params.sneep_scale_file = getGenomeAttribute('sneep_scale_file')
params.sneep_motif_file = getGenomeAttribute('sneep_motif_file')

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT FUNCTIONS / MODULES / SUBWORKFLOWS / WORKFLOWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

include { TFACTIVITY              } from './workflows/tfactivity'
include { PIPELINE_INITIALISATION } from './subworkflows/local/utils_nfcore_tfactivity_pipeline'
include { PIPELINE_COMPLETION     } from './subworkflows/local/utils_nfcore_tfactivity_pipeline'
include { PREPARE_GENOME          } from './subworkflows/local/prepare_genome'

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
    samplesheet     // channel: samplesheet read in from --input
    samplesheet_bam // channel: samplesheet read in from --input_bam
    counts_design   // channel: counts design file read in from --counts_design

    main:

    ch_versions = Channel.empty()

    fasta = file(params.fasta, checkIfExists: true)
    gtf = file(params.gtf, checkIfExists: true)

    ch_blacklist = Channel.value(params.blacklist ? file(params.blacklist, checkIfExists: true) : [])
    ch_motifs = params.motifs ? file(params.motifs, checkIfExists: true) : null
    ch_counts = Channel.value(file(params.counts, checkIfExists: true))

    snps = params.snps ? file(params.snps, checkIfExists: true) : null
    sneep_scale_file = params.sneep_scale_file ? file(params.sneep_scale_file, checkIfExists: true) : null
    sneep_motif_file = params.sneep_motif_file ? file(params.sneep_motif_file, checkIfExists: true) : null

    //
    // SUBWORKFLOW: Prepare genome
    //
    PREPARE_GENOME(
        fasta,
        gtf,
    )

    ch_extra_counts = counts_design.filter { _meta, file -> file }

    ch_versions = ch_versions.mix(PREPARE_GENOME.out.versions)

    //
    // WORKFLOW: Run pipeline
    //
    TFACTIVITY(
        samplesheet,
        sneep_scale_file,
        sneep_motif_file,
        PREPARE_GENOME.out.fasta,
        PREPARE_GENOME.out.gtf,
        ch_blacklist,
        ch_motifs,
        params.taxon_id,
        PREPARE_GENOME.out.gene_lengths,
        PREPARE_GENOME.out.gene_map,
        PREPARE_GENOME.out.chrom_sizes,
        samplesheet_bam,
        params.chromhmm_states,
        params.chromhmm_threshold,
        params.chromhmm_enhancer_marks.split(','),
        params.chromhmm_promoter_marks.split(','),
        params.merge_samples,
        params.affinity_aggregation,
        params.duplicate_motifs,
        ch_counts,
        ch_extra_counts,
        Channel.value([[id: "design"], file(params.counts_design, checkIfExists: true)]),
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
        snps,
        ch_versions,
    )
}
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    RUN MAIN WORKFLOW
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow {
    //
    // SUBWORKFLOW: Run initialisation tasks
    //
    PIPELINE_INITIALISATION(
        params.version,
        params.validate_params,
        params.monochrome_logs,
        args,
        params.outdir,
        params.input,
    )

    //
    // WORKFLOW: Run main workflow
    //
    NFCORE_TFACTIVITY(
        PIPELINE_INITIALISATION.out.samplesheet,
        PIPELINE_INITIALISATION.out.samplesheet_bam,
        PIPELINE_INITIALISATION.out.counts_design,
    )
    //
    // SUBWORKFLOW: Run completion tasks
    //
    PIPELINE_COMPLETION(
        params.email,
        params.email_on_fail,
        params.plaintext_email,
        params.outdir,
        params.monochrome_logs,
        params.hook_url,
    )
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//
// Get attribute from genome config file e.g. fasta
//

def getGenomeAttribute(attribute) {
    if (params.genomes && params.genome && params.genomes.containsKey(params.genome)) {
        if (params.genomes[params.genome].containsKey(attribute)) {
            return params.genomes[params.genome][attribute]
        }
    }
    return null
}
