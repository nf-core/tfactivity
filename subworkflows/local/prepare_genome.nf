include { ATLASGENEANNOTATIONMANIPULATION_GTF2FEATUREANNOTATION as EXTRACT_ID_SYMBOL_MAP } from '../../modules/nf-core/atlasgeneannotationmanipulation/gtf2featureannotation/main.nf'

workflow PREPARE_GENOME {

    take:
    fasta
    gtf

    main:

    ch_versions = Channel.empty()

    ch_fasta = Channel.value([[id: 'fasta'], file(fasta)])
    ch_gtf   = Channel.value([[id: 'gtf'],   file(gtf)])

    // TODO nf-core: substitute modules here for the modules of your subworkflow

    EXTRACT_ID_SYMBOL_MAP(ch_gtf, [[], []])
    ch_versions = ch_versions.mix(EXTRACT_ID_SYMBOL_MAP.out.versions)

    emit:
    // TODO nf-core: edit emitted channels

    versions = ch_versions                     // channel: [ versions.yml ]
}

