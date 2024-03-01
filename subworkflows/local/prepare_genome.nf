include { ATLASGENEANNOTATIONMANIPULATION_GTF2FEATUREANNOTATION as EXTRACT_ID_SYMBOL_MAP } from '../../modules/nf-core/atlasgeneannotationmanipulation/gtf2featureannotation/main.nf'
include { GAWK as REMOVE_GENE_VERSIONS    } from '../../modules/nf-core/gawk/main'
include { SAMTOOLS_FAIDX                  } from '../../modules/nf-core/samtools/faidx/main'

workflow PREPARE_GENOME {

    take:
    fasta
    gtf

    main:

    ch_versions = Channel.empty()

    ch_fasta = Channel.value([[id: 'fasta'], file(fasta)])
    ch_gtf   = Channel.value([[id: 'gtf'],   file(gtf)])

    // Prepare gene map

    EXTRACT_ID_SYMBOL_MAP(ch_gtf, [[], []])
    REMOVE_GENE_VERSIONS(EXTRACT_ID_SYMBOL_MAP.out.feature_annotation, [])

    ch_versions = ch_versions.mix(
        EXTRACT_ID_SYMBOL_MAP.out.versions,
        REMOVE_GENE_VERSIONS.out.versions
    )

    SAMTOOLS_FAIDX(ch_fasta, [[], []])

    ch_versions = ch_versions.mix(
        SAMTOOLS_FAIDX.out.versions
    )

    emit:
    gene_map = REMOVE_GENE_VERSIONS.out.output
    fai      = SAMTOOLS_FAIDX.out.fai

    versions = ch_versions                     // channel: [ versions.yml ]
}
