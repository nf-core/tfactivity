include { GUNZIP as GUNZIP_FASTA } from '../../../modules/nf-core/gunzip'
include { GUNZIP as GUNZIP_GTF   } from '../../../modules/nf-core/gunzip'
include { EXTRACT_ID_SYMBOL_MAP  } from '../../../modules/local/extract_id_symbol_map'
include { GTFTOOLS_LENGTH        } from '../../../modules/local/gtftools/length'
include { SAMTOOLS_FAIDX         } from '../../../modules/nf-core/samtools/faidx'

workflow PREPARE_GENOME {
    take:
    fasta
    gtf

    main:

    ch_versions = Channel.empty()

    ch_fasta = Channel.value([[id: 'fasta'], fasta])
    ch_gtf = Channel.value([[id: 'gtf'], gtf])

    if (fasta.extension == 'gz') {
        GUNZIP_FASTA(ch_fasta)
        ch_fasta = GUNZIP_FASTA.out.gunzip
        ch_versions = ch_versions.mix(GUNZIP_FASTA.out.versions)
    }

    if (gtf.extension == 'gz') {
        GUNZIP_GTF(ch_gtf)
        ch_gtf = GUNZIP_GTF.out.gunzip
        ch_versions = ch_versions.mix(GUNZIP_GTF.out.versions)
    }

    EXTRACT_ID_SYMBOL_MAP(ch_gtf)
    ch_versions = ch_versions.mix(EXTRACT_ID_SYMBOL_MAP.out.versions)

    GTFTOOLS_LENGTH(ch_gtf)
    ch_versions = ch_versions.mix(GTFTOOLS_LENGTH.out.versions)

    SAMTOOLS_FAIDX(ch_fasta, [[], []], false)
    ch_versions = ch_versions.mix(SAMTOOLS_FAIDX.out.versions)

    emit:
    gene_map     = EXTRACT_ID_SYMBOL_MAP.out.id_symbol_map
    gene_lengths = GTFTOOLS_LENGTH.out.lengths
    chrom_sizes  = SAMTOOLS_FAIDX.out.fai.collect()
    fasta        = ch_fasta
    gtf          = ch_gtf
    versions     = ch_versions // channel: [ versions.yml ]
}
