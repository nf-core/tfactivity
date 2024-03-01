include { ATLASGENEANNOTATIONMANIPULATION_GTF2FEATUREANNOTATION as EXTRACT_ID_SYMBOL_MAP } from '../../modules/nf-core/atlasgeneannotationmanipulation/gtf2featureannotation/main.nf'
include { SAMTOOLS_FAIDX                  } from '../../modules/nf-core/samtools/faidx/main'

workflow PREPARE_GENOME {

    take:
    fasta
    gtf

    main:

    ch_versions = Channel.empty()

    ch_fasta_tuple = fasta.map { fasta -> [[id: 'fasta'], fasta] }
    ch_gtf_tuple   = gtf.map { gtf -> [[id: 'gtf'], gtf] }

    // Prepare gene map

    EXTRACT_ID_SYMBOL_MAP(ch_gtf_tuple, [[], []])

    // Prepare fasta index

    SAMTOOLS_FAIDX(ch_fasta_tuple, [[], []])

    ch_versions = ch_versions.mix(
        EXTRACT_ID_SYMBOL_MAP.out.versions,
        SAMTOOLS_FAIDX.out.versions
    )

    emit:
    gene_map = EXTRACT_ID_SYMBOL_MAP.out.feature_annotation
    fai      = SAMTOOLS_FAIDX.out.fai

    versions = ch_versions                     // channel: [ versions.yml ]
}
