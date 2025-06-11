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

params.fasta     = getGenomeAttribute('fasta')
params.gtf       = getGenomeAttribute('gtf')
params.blacklist = getGenomeAttribute('blacklist')
params.taxon_id  = getGenomeAttribute('taxon_id')
params.snps      = getGenomeAttribute('snps')

if (!params.motifs && !params.taxon_id) {
    error "Please provide either a motifs file or a taxon ID"
}

if (params.skip_fimo && !params.skip_sneep) {
    log.warn("--skip_fimo automatically sets --skip_sneep since sneep requires fimo input.")
}

if (params.skip_chromhmm && !params.skip_rose) {
    log.warn("--skip_chromhmm automatically sets --skip_rose since rose requires chromhmm input.")
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT FUNCTIONS / MODULES / SUBWORKFLOWS / WORKFLOWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

include { TFACTIVITY  } from './workflows/tfactivity'
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
    samplesheet // channel: samplesheet read in from --input
    samplesheet_bam // channel: samplesheet read in from --input_bam
    counts_design // channel: counts design file read in from --counts_design

    main:

    ch_versions = Channel.empty()

    fasta = file(params.fasta, checkIfExists: true)
    gtf   = file(params.gtf, checkIfExists: true)
    ch_blacklist = params.blacklist ? Channel.value(file(params.blacklist, checkIfExists: true)) : Channel.value([])
    ch_motifs  = params.motifs ? Channel.value(file(params.motifs, checkIfExists: true)) : Channel.empty()
    ch_counts = Channel.value(file(params.counts, checkIfExists: true))
    taxon_id = (!params.motifs && params.taxon_id) ? params.taxon_id : null
    ch_snps = params.snps ? Channel.value(file(params.snps, checkIfExists: true)) : Channel.empty()

    //
    // SUBWORKFLOW: Prepare genome
    //
    PREPARE_GENOME (
        fasta,
        gtf
    )

    ch_extra_counts = counts_design.filter{ _meta, file -> file }

    ch_versions = ch_versions.mix(PREPARE_GENOME.out.versions)

    //
    // WORKFLOW: Run pipeline
    //
    TFACTIVITY (
        samplesheet,
        params.genome,
        PREPARE_GENOME.out.fasta,
        PREPARE_GENOME.out.gtf,
        ch_blacklist,
        ch_motifs,
        taxon_id,
        PREPARE_GENOME.out.gene_lengths,
        PREPARE_GENOME.out.gene_map,
        PREPARE_GENOME.out.chrom_sizes,

        // ChromHMM
        samplesheet_bam,
        params.chromhmm_states,
        params.chromhmm_threshold,
        params.chromhmm_enhancer_marks.split(','),
        params.chromhmm_promoter_marks.split(','),

        // Peaks
        params.window_size,
        params.decay,
        params.merge_samples,
        params.affinity_aggregation,

        // Counts
        ch_counts,
        ch_extra_counts,
        Channel.value([[id: "design"], file(params.counts_design, checkIfExists: true)]),
        params.min_count,
        params.min_tpm,
        params.expression_aggregation,
        params.min_count_tf,
        params.min_tpm_tf,

        // Dynamite
        params.dynamite_ofolds,
        params.dynamite_ifolds,
        params.dynamite_alpha,
        params.dynamite_randomize,

        // Ranking
        params.alpha,

        // Sneep
        ch_snps,

        ch_versions
    )
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
        PIPELINE_INITIALISATION.out.samplesheet,
        PIPELINE_INITIALISATION.out.samplesheet_bam,
        PIPELINE_INITIALISATION.out.counts_design
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
        if (params.genomes[ params.genome ].containsKey(attribute)) {
            return params.genomes[ params.genome ][ attribute ]
        }
    }
    return null
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    THE END
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
