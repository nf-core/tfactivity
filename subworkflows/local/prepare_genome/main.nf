include { GUNZIP as GUNZIP_FASTA                                                         } from '../../../modules/nf-core/gunzip'
include { GUNZIP as GUNZIP_GTF                                                           } from '../../../modules/nf-core/gunzip'
include { AGAT_CONVERTSPGXF2GXF                                                          } from '../../../modules/nf-core/agat/convertspgxf2gxf'
include { AGAT_CONVERTSPGFF2GTF                                                          } from '../../../modules/nf-core/agat/convertspgff2gtf'
include { ATLASGENEANNOTATIONMANIPULATION_GTF2FEATUREANNOTATION as EXTRACT_ID_SYMBOL_MAP } from '../../../modules/nf-core/atlasgeneannotationmanipulation/gtf2featureannotation'
include { GTFTOOLS_LENGTH                                                                } from '../../../modules/local/gtftools/length'
include { SAMTOOLS_FAIDX                                                                 } from '../../../modules/nf-core/samtools/faidx'

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

    // Add missing genes to the GTF file
    AGAT_CONVERTSPGXF2GXF(ch_gtf)
    ch_versions = ch_versions.mix(AGAT_CONVERTSPGXF2GXF.out.versions)

    // Convert GFF to GTF
    AGAT_CONVERTSPGFF2GTF(AGAT_CONVERTSPGXF2GXF.out.output_gff)
    ch_gtf = AGAT_CONVERTSPGFF2GTF.out.output_gtf
    ch_versions = ch_versions.mix(AGAT_CONVERTSPGFF2GTF.out.versions)

    // Prepare gene map

    EXTRACT_ID_SYMBOL_MAP(ch_gtf, [[], []])
    GTFTOOLS_LENGTH(ch_gtf)

    SAMTOOLS_FAIDX(ch_fasta, [[], []])

    ch_versions = ch_versions.mix(
        EXTRACT_ID_SYMBOL_MAP.out.versions,
        GTFTOOLS_LENGTH.out.versions,
        SAMTOOLS_FAIDX.out.versions,
    )

    emit:
    gene_map     = EXTRACT_ID_SYMBOL_MAP.out.feature_annotation
    gene_lengths = GTFTOOLS_LENGTH.out.lengths
    chrom_sizes  = SAMTOOLS_FAIDX.out.fai.collect()
    fasta        = ch_fasta
    gtf          = ch_gtf
    versions     = ch_versions // channel: [ versions.yml ]
}
