include { BINARIZE_BAMS                       } from '../../../modules/local/chromhmm/binarize_bams'
include { LEARN_MODEL                         } from '../../../modules/local/chromhmm/learn_model'
include { GET_RESULTS as GET_ENHANCER_RESULTS } from '../../../modules/local/chromhmm/get_results'
include { GET_RESULTS as GET_PROMOTER_RESULTS } from '../../../modules/local/chromhmm/get_results'

workflow CHROMHMM {
    take:
    ch_samplesheet_bam
    chrom_sizes
    n_states
    threshold
    enhancer_marks
    promoter_marks

    main:

    ch_versions = Channel.empty()

    ch_files = ch_samplesheet_bam.map{ _meta, signal, control -> [signal, control]}.flatten().filter { f -> f != null }

    ch_table = ch_samplesheet_bam
        .map { meta, signal, control -> [meta.condition, meta.assay, signal.name, control ? control.name : ''] }
        .collectFile {
            ["cellmarkfiletable.tsv", it.join("\t") + "\n"]
        }
        .map { [it.baseName, it] }
        .collect()

    // drop meta, remove duplicated control bams, add new meta
    BINARIZE_BAMS(
        ch_files.unique().collect().map { files -> [[id: "chromHMM"], files] },
        ch_table,
        chrom_sizes,
    )
    ch_versions = ch_versions.mix(BINARIZE_BAMS.out.versions)

    LEARN_MODEL(
        BINARIZE_BAMS.out.binarized_bams.map { _meta, files -> files }.flatten().collect().map { files -> [[id: "chromHMM"], files] },
        n_states,
    )
    ch_versions = ch_versions.mix(LEARN_MODEL.out.versions)

    GET_ENHANCER_RESULTS(
        LEARN_MODEL.out.model.transpose().map { _meta, emissions, bed -> [[id: bed.simpleName.split("_")[0]], emissions, bed] },
        threshold,
        enhancer_marks,
    )
    ch_versions = ch_versions.mix(GET_ENHANCER_RESULTS.out.versions)

    GET_PROMOTER_RESULTS(
        LEARN_MODEL.out.model.transpose().map { _meta, emissions, bed -> [[id: bed.simpleName.split("_")[0]], emissions, bed] },
        threshold,
        promoter_marks,
    )
    ch_versions = ch_versions.mix(GET_PROMOTER_RESULTS.out.versions)

    ch_enhancers = GET_ENHANCER_RESULTS.out.regions.map { meta, bed -> [[id: meta.id + "_" + "chromHMM_enhancers", condition: meta.id, assay: "chromHMM_enhancers"], bed] }
    ch_promoters = GET_PROMOTER_RESULTS.out.regions.map { meta, bed -> [[id: meta.id + "_" + "chromHMM_promoters", condition: meta.id, assay: "chromHMM_promoters"], bed] }

    emit:
    enhancers = ch_enhancers
    promoters = ch_promoters
    versions  = ch_versions
}
