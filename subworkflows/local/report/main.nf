include { REPORT_PREPROCESS } from "../../../modules/local/report/preprocess"

workflow REPORT {
    take:
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
    regression_coefficients
    summary_params
    versions

    main:

    REPORT_PREPROCESS(
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
        regression_coefficients,
        summary_params,
        versions
    )
}