// Modules
include { SAMTOOLS_REHEADER as REHEADER_SIGNAL  } from '../../modules/nf-core/samtools/reheader'
include { SAMTOOLS_REHEADER as REHEADER_CONTROL } from '../../modules/nf-core/samtools/reheader'
include { BINARIZE_BAMS                         } from '../../modules/local/chromhmm/binarize_bams'
 
workflow CHROMHMM {

    take:
    ch_samplesheet_bam
    chrom_sizes

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
                                        antibody: meta.antibody],
                                    bam]}

    ch_signal  = REHEADER_SIGNAL (ch_bams.signal ).bam.map{meta, bam -> remove_type(meta, bam)}
    ch_control = REHEADER_CONTROL(ch_bams.control).bam.map{meta, bam -> remove_type(meta, bam)}
    ch_joined  = ch_signal.join(ch_control)
    ch_mixed   = ch_signal.mix(ch_control)

    ch_condition_table   = ch_joined .map{meta, signal, control -> [meta.condition, meta.antibody, signal.name, control.name]}
                                    .collectFile() {
                                        [it[0] + ".tsv", it.join("\t") + "\n"]
                                    }.map{[it.baseName, it]}

    ch_conditions = ch_condition_table.join(
        ch_mixed.map{meta, bam -> [meta.condition, bam]}.groupTuple()
    ).map{condition, table, bams -> [[id: condition], table, bams]}

    BINARIZE_BAMS(
        ch_conditions,
        chrom_sizes
    )


    emit:

    versions = ch_versions                     // channel: [ versions.yml ]
}

