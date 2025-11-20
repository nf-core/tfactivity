include { UNTAR                           } from "../../../modules/nf-core/untar"
include { REPORT_PREPROCESS as PREPROCESS } from "../../../modules/local/report/preprocess"
include { REPORT_CREATE as CREATE         } from "../../../modules/local/report/create"
include { ZIP                             } from "../../../modules/nf-core/zip"

include { paramsSummaryMap                } from 'plugin/nf-schema'
include { paramsSummaryToYAML             } from '../../local/utils_nfcore_tfactivity_pipeline'
include { methodsDescriptionText          } from '../../local/utils_nfcore_tfactivity_pipeline'
include { softwareVersionsToYAML          } from '../../nf-core/utils_nfcore_pipeline'

workflow REPORT {
    take:
    gtf
    tf_rankings
    tg_rankings
    deseq2_differential
    raw_counts
    normalized
    tpms
    counts_design
    affinity_sum
    affinity_ratio
    affinities
    candidate_regions
    regression_coefficients
    fimo_binding_sites
    ch_versions

    main:
    UNTAR([[id: 'report'], file("https://github.com/daisybio/nfcore-tfactivity-report/archive/refs/tags/v0.5.0.tar.gz", checkIfExists: true)])
    ch_versions = ch_versions.mix(UNTAR.out.versions)

    //
    // Collate and save software versions
    //
    softwareVersionsToYAML(ch_versions)
        .collectFile(
            storeDir: "${params.outdir}/pipeline_info",
            name: 'nf_core_tfactivity_software_versions.yml',
            sort: true,
            newLine: true,
        )
        .set { ch_collated_versions }

    summary_params = paramsSummaryMap(
        workflow,
        parameters_schema: "nextflow_schema.json"
    )
    ch_workflow_summary = Channel.value(paramsSummaryToYAML(summary_params))
    ch_methods_description = Channel.value(methodsDescriptionText())

    PREPROCESS(
        gtf,
        tf_rankings,
        tg_rankings,
        deseq2_differential,
        raw_counts,
        normalized,
        tpms,
        counts_design,
        affinity_sum,
        affinity_ratio,
        affinities,
        candidate_regions,
        regression_coefficients,
        fimo_binding_sites,
        ch_workflow_summary.collectFile(name: 'params.yaml'),
        ch_collated_versions,
        ch_methods_description.collectFile(name: 'methods_description.json'),
    )

    CREATE(
        UNTAR.out.untar,
        PREPROCESS.out.metadata,
        PREPROCESS.out.params,
        PREPROCESS.out.overview,
        PREPROCESS.out.transcription_factors,
        PREPROCESS.out.candidate_regions,
        PREPROCESS.out.gene_locations,
        PREPROCESS.out.target_genes
    )

    ZIP(CREATE.out)
}
