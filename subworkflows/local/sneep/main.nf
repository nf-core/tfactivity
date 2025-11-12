include { FILTER_SCALES_MOTIFS                        } from '../../../modules/local/sneep/filter_scales_motifs'
include { GAWK as GFF_TO_BED                          } from '../../../modules/nf-core/gawk'
include { GNU_SORT as SORT_BED                        } from '../../../modules/nf-core/gnu/sort'
include { BEDTOOLS_MERGE as MERGE_DUPLICATE_REGIONS   } from '../../../modules/nf-core/bedtools/merge'
include { BEDTOOLS_INTERSECT as FILTER_SNPS_BY_REGION } from '../../../modules/nf-core/bedtools/intersect'
include { RUN_SNEEP                                   } from '../../../modules/local/sneep/run_sneep'

workflow SNEEP {
    take:
    snps
    scale_file
    motif_file
    genome_fasta
    motif_regions

    main:
    ch_versions = Channel.empty()

    // Filter transfac and scale file for motifs found with FIMO
    FILTER_SCALES_MOTIFS(
        motif_file,
        scale_file,
        motif_regions.map { _meta, regions -> regions }.collect(),
    )
    ch_versions = ch_versions.mix(FILTER_SCALES_MOTIFS.out.versions)

    // Convert gff with motif regions to bed
    GFF_TO_BED(motif_regions, [], false)
    ch_versions = ch_versions.mix(GFF_TO_BED.out.versions)

    // Merge regions that overlap
    SORT_BED(GFF_TO_BED.out.output)
    ch_versions = ch_versions.mix(SORT_BED.out.versions)

    MERGE_DUPLICATE_REGIONS(SORT_BED.out.sorted)
    ch_versions = ch_versions.mix(MERGE_DUPLICATE_REGIONS.out.versions)

    // Remove SNPs that are not within regions
    ch_filter_snps_by_regions = MERGE_DUPLICATE_REGIONS.out.bed
        .map { meta, regions -> [meta, snps, regions] }
    FILTER_SNPS_BY_REGION(ch_filter_snps_by_regions, [[], []])
    ch_versions = ch_versions.mix(FILTER_SNPS_BY_REGION.out.versions)

    // Remove files that are empty (no overlap)
    ch_sneep_input_snps = FILTER_SNPS_BY_REGION.out.intersect.filter { _meta, file -> !file.empty() }

    RUN_SNEEP(
        ch_sneep_input_snps,
        FILTER_SCALES_MOTIFS.out.transfac,
        genome_fasta.map { _meta, fasta -> fasta },
        FILTER_SCALES_MOTIFS.out.scale_file,
    )
    ch_versions = ch_versions.mix(RUN_SNEEP.out.versions)

    emit:
    pfms                        = RUN_SNEEP.out.pfms
    indels                      = RUN_SNEEP.out.indels
    info                        = RUN_SNEEP.out.info
    motifinfo                   = RUN_SNEEP.out.motifinfo
    notconsideredsnps           = RUN_SNEEP.out.notconsideredsnps
    result                      = RUN_SNEEP.out.result
    snpregions_bed              = RUN_SNEEP.out.snpregions_bed
    snpregions_fa               = RUN_SNEEP.out.snpregions_fa
    snpsregions_notuniq_sorted  = RUN_SNEEP.out.snpsregions_notuniq_sorted
    snpsregions_notuniq         = RUN_SNEEP.out.snpsregions_notuniq
    snpsunique                  = RUN_SNEEP.out.snpsunique
    sortedsnpsnotunique         = RUN_SNEEP.out.sortedsnpsnotunique
    tf_count                    = RUN_SNEEP.out.tf_count
    versions = ch_versions
}
