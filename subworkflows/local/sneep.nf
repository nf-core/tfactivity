include { FILTER_SCALES_MOTIFS } from '../../modules/local/sneep/filter_scales_motifs'
include { GAWK as GFF_TO_BED } from '../../modules/nf-core/gawk'
include { GNU_SORT as SORT_BED } from '../../modules/nf-core/gnu/sort'
include { BEDTOOLS_MERGE as MERGE_DUPLICATE_REGIONS } from '../../modules/nf-core/bedtools/merge'
include { BEDTOOLS_INTERSECT as FILTER_SNPS_BY_REGION } from '../../modules/nf-core/bedtools/intersect'
include { MERGE_SAMPLES } from './merge_samples.nf'
include { RUN_SNEEP } from '../../modules/local/sneep/run_sneep'

workflow SNEEP {

    take:
    motifs_transfac // Coming from MOTIFS subworkflow
    snp_file // Coming from user/params/download
    genome_fasta // Coming from pipeline
    scale_file // Coming from user/params/download
    motif_regions //Coming from FIMO

    main:

    // Decide on organism based on organism ID or genome name
    // Download right SNP files (and scale/motif files)

    // Filter transfac and scale file for motifs found with FIMO
    FILTER_SCALES_MOTIFS(
        motifs_transfac,
        scale_file,
        motif_regions.map{meta, regions -> regions}.collect()
    )

    // Convert gff with motif regions to bed
    GFF_TO_BED(motif_regions, [])

    // Merge regions that overlap
    SORT_BED(GFF_TO_BED.out.output)
    MERGE_DUPLICATE_REGIONS(SORT_BED.out.sorted)

    // Remove SNPs that are not within regions
    ch_filter_snps_by_regions = snp_file
        .combine(MERGE_DUPLICATE_REGIONS.out.bed)
        .map{snps, meta, regions -> [meta, snps, regions]}
    FILTER_SNPS_BY_REGION(ch_filter_snps_by_regions, [[], []])

    // Remove files that are empty (no overlap)
    ch_sneep_input_snps = FILTER_SNPS_BY_REGION.out.intersect
        .filter{meta, file -> !file.empty()}

    RUN_SNEEP(
        ch_sneep_input_snps,
        FILTER_SCALES_MOTIFS.out.transfac.first(),
        genome_fasta.map{meta, fasta -> fasta},
        FILTER_SCALES_MOTIFS.out.scale_file.first()
    )

    ch_versions = Channel.empty()
    ch_versions = ch_versions.mix(
        FILTER_SCALES_MOTIFS.out.versions,
        GFF_TO_BED.out.versions,
        SORT_BED.out.versions,
        MERGE_DUPLICATE_REGIONS.out.versions,
        FILTER_SNPS_BY_REGION.out.versions,
        RUN_SNEEP.out.versions
    )

    emit:
    versions = ch_versions
}
