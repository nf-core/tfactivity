// Modules
include { SAMTOOLS_REHEADER as REHEADER_SIGNAL  } from '../../modules/nf-core/samtools/reheader'
include { SAMTOOLS_REHEADER as REHEADER_CONTROL } from '../../modules/nf-core/samtools/reheader'
include { BINARIZE_BAMS                         } from '../../modules/local/chromhmm/binarize_bams'
include { LEARN_MODEL                           } from '../../modules/local/chromhmm/learn_model'
include { GET_RESULTS as GET_ENHANCER_RESULTS   } from '../../modules/local/chromhmm/get_results'
include { GET_RESULTS as GET_PROMOTER_RESULTS   } from '../../modules/local/chromhmm/get_results'

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

    ch_bams = ch_samplesheet_bam.map{meta, signal, control -> [meta, ["signal", "control"], [signal, control]]}
                                .transpose()
                                .map{meta, type, bam -> [meta + [type: type], bam]}
                                .branch   {meta, bam ->
                                    control: meta.type == "control"
                                    signal:  meta.type == "signal"
                                }

    def remove_type = {meta, bam -> [[  id: meta.id,
                                        condition: meta.condition,
                                        assay: meta.assay],
                                    bam]}


    ch_signal  = ch_bams.signal.map{meta, bam -> remove_type(meta, bam)}
    ch_control = ch_bams.control.map{meta, bam -> remove_type(meta, bam)}
    
    ch_joined  = ch_signal.join(ch_control)
    ch_mixed   = ch_signal.mix(ch_control)

    ch_table   = ch_joined .map{meta, signal, control -> [meta.condition, meta.assay, signal.name, control.name]}
                                    .collectFile() {
                                        ["cellmarkfiletable.tsv", it.join("\t") + "\n"]
                                    }.map{[it.baseName, it]}.collect()
    
    // drop meta, remove duplicated control bams, add new meta
    BINARIZE_BAMS(
        ch_mixed.map{meta, bam -> bam}.unique().collect().map{files -> [[id: "chromHMM"], files]},
        ch_table,
        chrom_sizes
    )

    LEARN_MODEL(
        BINARIZE_BAMS.out.binarized_bams.map{meta, files -> files}.flatten().collect().map{files -> [[id: "chromHMM"], files]},
        n_states
    )

    GET_ENHANCER_RESULTS(LEARN_MODEL.out.model
                            .transpose()
                            .map{meta, emissions, bed -> [[id: bed.simpleName.split("_")[0]], emissions, bed]},
                        threshold,
                        enhancer_marks,
                        )

    GET_PROMOTER_RESULTS(LEARN_MODEL.out.model
                            .transpose()
                            .map{meta, emissions, bed -> [[id: bed.simpleName.split("_")[0]], emissions, bed]},
                        threshold,
                        promoter_marks,
                        )

    ch_enhancers = GET_ENHANCER_RESULTS.out.regions
        .map{meta, bed -> [[id: meta.id + "_" + "chromHMM_enhancers", condition: meta.id, assay: "chromHMM_enhancers"], bed]}

    ch_promoters = GET_PROMOTER_RESULTS.out.regions
        .map{meta, bed -> [[id: meta.id + "_" + "chromHMM_promoters", condition: meta.id, assay: "chromHMM_promoters"], bed]}

    ch_versions = ch_versions.mix(
        BINARIZE_BAMS.out.versions,
        LEARN_MODEL.out.versions,
        GET_ENHANCER_RESULTS.out.versions,
        GET_PROMOTER_RESULTS.out.versions,
        )

    emit:
    enhancers = ch_enhancers
    promoters = ch_promoters

    versions = ch_versions
}
