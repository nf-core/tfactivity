include { FILTER_SCALES_MOTIFS                        } from '../../modules/local/sneep/filter_scales_motifs'
include { GAWK as GFF_TO_BED                          } from '../../modules/nf-core/gawk'
include { GNU_SORT as SORT_BED                        } from '../../modules/nf-core/gnu/sort'
include { BEDTOOLS_MERGE as MERGE_DUPLICATE_REGIONS   } from '../../modules/nf-core/bedtools/merge'
include { BEDTOOLS_INTERSECT as FILTER_SNPS_BY_REGION } from '../../modules/nf-core/bedtools/intersect'
include { RUN_SNEEP                                   } from '../../modules/local/sneep/run_sneep'

workflow SNEEP {
    take:
    genome
    snps
    genome_fasta
    motif_regions

    main:
    ch_versions = Channel.empty()

    // Choose scale and motif file based on genome version
    if (genome == "hg38") {
        ch_scale_file = file("${projectDir}/assets/sneep_scale_human_817.txt", checkIfExists: true)
        ch_motif_file = file("${projectDir}/assets/sneep_transfac_human_817.txt", checkIfExists: true)
    }
    else if (genome == "mm10") {
        ch_scale_file = file("${projectDir}/assets/sneep_scale_mouse_218.txt", checkIfExists: true)
        ch_motif_file = file("${projectDir}/assets/sneep_transfac_mouse_218.txt", checkIfExists: true)
    }
    else {
        error("Genome ${genome} not valid for the use with sneep. Enable --skip_sneep or change the genome.")
    }

    // Filter transfac and scale file for motifs found with FIMO
    FILTER_SCALES_MOTIFS(
        ch_motif_file,
        ch_scale_file,
        motif_regions.map { _meta, regions -> regions }.collect(),
    )
    ch_versions = ch_versions.mix(FILTER_SCALES_MOTIFS.out.versions)

    // Convert gff with motif regions to bed
    GFF_TO_BED(motif_regions, [])
    ch_versions = ch_versions.mix(GFF_TO_BED.out.versions)

    // Merge regions that overlap
    SORT_BED(GFF_TO_BED.out.output)
    ch_versions = ch_versions.mix(SORT_BED.out.versions)

    MERGE_DUPLICATE_REGIONS(SORT_BED.out.sorted)
    ch_versions = ch_versions.mix(MERGE_DUPLICATE_REGIONS.out.versions)

    // Remove SNPs that are not within regions
    ch_filter_snps_by_regions = snps
        .combine(MERGE_DUPLICATE_REGIONS.out.bed)
        .map { snp, meta, regions -> [meta, snp, regions] }
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
    versions = ch_versions
}
