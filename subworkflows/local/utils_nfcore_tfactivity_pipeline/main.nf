//
// Subworkflow with functionality specific to the nf-core/tfactivity pipeline
//

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORT FUNCTIONS / MODULES / SUBWORKFLOWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

include { UTILS_NFSCHEMA_PLUGIN     } from '../../nf-core/utils_nfschema_plugin'
include { paramsSummaryMap          } from 'plugin/nf-schema'
include { samplesheetToList         } from 'plugin/nf-schema'
include { completionEmail           } from '../../nf-core/utils_nfcore_pipeline'
include { completionSummary         } from '../../nf-core/utils_nfcore_pipeline'
include { imNotification            } from '../../nf-core/utils_nfcore_pipeline'
include { UTILS_NFCORE_PIPELINE     } from '../../nf-core/utils_nfcore_pipeline'
include { UTILS_NEXTFLOW_PIPELINE   } from '../../nf-core/utils_nextflow_pipeline'

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    SUBWORKFLOW TO INITIALISE PIPELINE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow PIPELINE_INITIALISATION {

    take:
    version           // boolean: Display version and exit
    validate_params   // boolean: Boolean whether to validate parameters against the schema at runtime
    monochrome_logs   // boolean: Do not use coloured log outputs
    nextflow_cli_args //   array: List of positional nextflow CLI args
    outdir            //  string: The output directory where the results will be saved
    input             //  string: Path to input samplesheet

    main:

    ch_versions = Channel.empty()

    //
    // Print version and exit if required and dump pipeline parameters to JSON file
    //
    UTILS_NEXTFLOW_PIPELINE (
        version,
        true,
        outdir,
        workflow.profile.tokenize(',').intersect(['conda', 'mamba']).size() >= 1
    )

    //
    // Validate parameters and generate parameter summary to stdout
    //
    UTILS_NFSCHEMA_PLUGIN (
        workflow,
        validate_params,
        null
    )

    //
    // Check config provided to the pipeline
    //
    UTILS_NFCORE_PIPELINE (
        nextflow_cli_args
    )

    //
    // Custom validation for pipeline parameters
    //
    // validateInputParameters()

    //
    // Create channel from input file provided through params.input
    //

    Channel
        .fromList(samplesheetToList(params.input, "${projectDir}/assets/schema_input.json"))
        .map {
            validateInputSamplesheet(it)
        }
        .set { ch_samplesheet }

    ch_samplesheet_bam = params.input_bam ? Channel.fromList(samplesheetToList(params.input_bam, "${projectDir}/assets/schema_input_bam.json")) : Channel.empty()
    ch_counts_design = Channel.fromList(samplesheetToList(params.counts_design, "${projectDir}/assets/schema_counts_design.json"))

    emit:
    samplesheet     = ch_samplesheet
    samplesheet_bam = ch_samplesheet_bam
    counts_design   = ch_counts_design
    versions        = ch_versions
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    SUBWORKFLOW FOR PIPELINE COMPLETION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

workflow PIPELINE_COMPLETION {

    take:
    email           //  string: email address
    email_on_fail   //  string: email address sent on pipeline failure
    plaintext_email // boolean: Send plain-text email instead of HTML
    outdir          //    path: Path to output directory where results will be published
    monochrome_logs // boolean: Disable ANSI colour codes in log output
    hook_url        //  string: hook URL for notifications

    main:
    summary_params = paramsSummaryMap(workflow, parameters_schema: "nextflow_schema.json")

    //
    // Completion email and summary
    //
    workflow.onComplete {
        if (email || email_on_fail) {
            completionEmail(
                summary_params,
                email,
                email_on_fail,
                plaintext_email,
                outdir,
                monochrome_logs,
                []
            )
        }

        completionSummary(monochrome_logs)
        if (hook_url) {
            imNotification(summary_params, hook_url)
        }
    }

    workflow.onError {
        log.error "Pipeline failed. Please refer to troubleshooting docs: https://nf-co.re/docs/usage/troubleshooting"
    }
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
//
// Check and validate pipeline parameters
//
def validateInputParameters() {
    genomeExistsError()
}

//
// Validate channels from input samplesheet
//
def validateInputSamplesheet(input) {
    def (meta, peak_files) = input[0..1]

    // Check that include_original is only set to false if footprinting is enabled
    if ( !meta.footprinting && !meta.include_original ) {
        error("The 'include_original' parameter can only be set to 'false' if 'footprinting' is enabled.")
    }

    return [ meta, peak_files ]
}
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

//
// Exit pipeline if incorrect --genome key provided
//
def genomeExistsError() {
    if (params.genomes && params.genome && !params.genomes.containsKey(params.genome)) {
        def error_string = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
            "  Genome '${params.genome}' not found in any config files provided to the pipeline.\n" +
            "  Currently, the available genome keys are:\n" +
            "  ${params.genomes.keySet().join(", ")}\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        error(error_string)
    }
}
//
// Generate methods description for MultiQC
//
def toolCitationText() {
    def tools = [
            'DESeq2 (Love et al. 2014)',
            'STARE (Hecker et al. 2023)',
            'BEDTools (Quinlan et al. 2010)',
            'GTFtools (Li et al. 2022)',
            params.input_bam ? 'ChromHMM (Ernst et al. 2017)' : '',
            'DYNAMITE (Schmidt et al. 2019)',
            'Biopython (Cock et al. 2009)',
            'JASPAR (Rauluseviciute et al. 2024)',
            'universalmotif (Tremblay 2024)',
            params.skip_fimo ? '' : 'FIMO (Grant et al. 2011)',
            params.skip_sneep ? '' : 'SNEEP (Baumgarten et al. 2024)'
        ]

    def citation_text = "Tools used in the workflow included: ${tools.join(', ')}."

    return citation_text
}

def toolBibliographyText() {
    def references = [
            "<li>Love MI, Huber W, Anders S. Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biol. 2014;15:550. doi:10.1186/s13059-014-0550-8.</li>",
            "<li>Hecker D, Behjati Ardakani F, Karollus A, Gagneur J, Schulz MH. The adapted Activity-By-Contact model for enhancer–gene assignment and its application to single-cell data (STARE). Bioinformatics. 2023;39(2). doi:10.1093/bioinformatics/btad062.</li>",
            "<li>Quinlan AR, Hall IM. BEDTools: a flexible suite of utilities for comparing genomic features. Bioinformatics. 2010;26(6):841-842. doi:10.1093/bioinformatics/btq033.</li>",
            "<li>Li H-D, Lin C-X, Zheng J. GTFtools: a software package for analyzing various features of gene models. Bioinformatics. 2022;38(20):4806–4808. doi:10.1093/bioinformatics/btac561.</li>",
            (params.input_bam ? "<li>Ernst J, Kellis M. Chromatin-state discovery and genome annotation with ChromHMM. Nat Protoc. 2017;12:2478–2492. doi:10.1038/nprot.2017.124.</li>" : ""),
            "<li>Schmidt F, Kern F, Ebert P, Baumgarten N, Schulz MH. TEPIC 2—an extended framework for transcription factor binding prediction and integrative epigenomic analysis (DYNAMITE). Bioinformatics. 2019;35(9):1608–1610. doi:10.1093/bioinformatics/bty856.</li>",
            "<li>Cock PJA, Antao T, Chang JT, et al. Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics. 2009;25(11):1422–1423. doi:10.1093/bioinformatics/btp163.</li>",
            (params.skip_fimo ? "" : "<li>Grant CE, Bailey TL, Noble WS. FIMO: scanning for occurrences of a given motif. Bioinformatics. 2011;27(7):1017–1018. doi:10.1093/bioinformatics/btr064.</li>"),
            "<li>Rauluseviciute I, Riudavets-Puig R, Blanc-Mathieu R, et al. JASPAR 2024: 20th anniversary of the open-access database of transcription factor binding profiles. Nucleic Acids Res. 2024;52(D1):D174–D182. doi:10.1093/nar/gkad1059.</li>",
            "<li>Tremblay BJ. universalmotif: An R package for biological motif analysis. Journal of Open Source Software. 2024;9(100):7012. doi:10.21105/joss.07012.</li>",
            (params.skip_sneep ? "" : "<li>Baumgarten N, Ebert P, Schmidt F, Kern F, Schulz MH. A statistical approach for identifying single nucleotide variants that affect transcription factor binding (SNEEP). iScience. 2024;27(5):109765. doi:10.1016/j.isci.2024.109765.</li>")
        ].findAll { it }

    def reference_text = references.join(' ').trim()

    return reference_text
}

def methodsDescriptionText() {
    // Convert  to a named map so can be used as with familiar NXF ${workflow} variable syntax in the MultiQC YML file
    def meta = [:]
   //  meta.workflow = workflow.toMap()
   meta["manifest_map"] = workflow.manifest.toMap()

    // Pipeline DOI
    if (meta.manifest_map.doi) {
        // Using a loop to handle multiple DOIs
        // Removing `https://doi.org/` to handle pipelines using DOIs vs DOI resolvers
        // Removing ` ` since the manifest.doi is a string and not a proper list
        def temp_doi_ref = ""
        def manifest_doi = meta.manifest_map.doi.tokenize(",")
        manifest_doi.each { doi_ref ->
            temp_doi_ref += "(doi: <a href=\'https://doi.org/${doi_ref.replace("https://doi.org/", "").replace(" ", "")}\'>${doi_ref.replace("https://doi.org/", "").replace(" ", "")}</a>), "
        }
        meta["doi_text"] = temp_doi_ref.substring(0, temp_doi_ref.length() - 2)
    } else meta["doi_text"] = ""
    meta["nodoi_text"] = meta.manifest_map.doi ? "" : "<li>If available, make sure to update the text to include the Zenodo DOI of version of the pipeline used. </li>"

    // Tool references
    meta["tool_citations"] = toolCitationText().replaceAll(", \\.", ".").replaceAll("\\. \\.", ".").replaceAll(", \\.", ".")
    meta["tool_bibliography"] = toolBibliographyText()


    // Serialize to JSON so downstream can store it directly
    return groovy.json.JsonOutput.toJson(meta)
}

def paramsSummaryToYAML(summary_params) {
    def yaml_file_text = ""
    summary_params
        .keySet()
        .sort()
        .each { group ->
            def group_params = summary_params.get(group)
            if (group_params) {
                yaml_file_text += "${group}:\n"
                group_params
                    .keySet()
                    .sort()
                    .each { param ->
                        if (param == "runName" || param == "trace_report_suffix") {
                            return // skip these keys to stabilize the hashes
                        }
                        def value = group_params.get(param)
                        yaml_file_text += "  ${param}: ${value ?: 'null'}\n"
                    }
            }
        }
    return yaml_file_text.trim()
}
