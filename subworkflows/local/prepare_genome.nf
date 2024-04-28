include { GUNZIP as GUNZIP_FASTA } from '../../modules/nf-core/gunzip'
include { GUNZIP as GUNZIP_GTF   } from '../../modules/nf-core/gunzip'

include { ATLASGENEANNOTATIONMANIPULATION_GTF2FEATUREANNOTATION as EXTRACT_ID_SYMBOL_MAP } from '../../modules/nf-core/atlasgeneannotationmanipulation/gtf2featureannotation'
include { GTFTOOLS_LENGTH } from '../../modules/local/gtftools/length'
include { SAMTOOLS_FAIDX  } from '../../modules/nf-core/samtools/faidx'

workflow PREPARE_GENOME {

    take:
    fasta
    gtf

    main:

    ch_versions = Channel.empty()

    ch_fasta = fasta.map { fasta -> [[id: 'fasta'], fasta] }
    ch_gtf   = gtf.map { gtf -> [[id: 'gtf'], gtf] }

    ch_fasta_branched = ch_fasta.branch {
        gzip: it[1].extension == '.gz'
        standard: it[1].extension != '.gz'
    }

    ch_gtf_branched = ch_gtf.branch {
        gzip: it[1].extension == '.gz'
        standard: it[1].extension != '.gz'
    }

    // Unzip fasta and gtf
    ch_fasta = GUNZIP_FASTA(ch_fasta_branched.gzip).gunzip
                .mix(ch_fasta_branched.standard)
                .first()
    ch_gtf = GUNZIP_GTF(ch_gtf_branched.gzip).gunzip
                .mix(ch_gtf_branched.standard)
                .first()

    ch_versions = ch_versions.mix(
        GUNZIP_FASTA.out.versions,
        GUNZIP_GTF.out.versions
    )

    // Prepare gene map

    EXTRACT_ID_SYMBOL_MAP(ch_gtf, [[], []])
    GTFTOOLS_LENGTH(ch_gtf)

    SAMTOOLS_FAIDX(ch_fasta, [[], []])

    ch_versions = ch_versions.mix(
        EXTRACT_ID_SYMBOL_MAP.out.versions,
        GTFTOOLS_LENGTH.out.versions,
        SAMTOOLS_FAIDX.out.versions
    )

    emit:
    gene_map = EXTRACT_ID_SYMBOL_MAP.out.feature_annotation
    gene_lengths = GTFTOOLS_LENGTH.out.lengths
    chrom_sizes = SAMTOOLS_FAIDX.out.fai.collect()
    fasta = ch_fasta
    gtf = ch_gtf

    versions = ch_versions                     // channel: [ versions.yml ]
}
