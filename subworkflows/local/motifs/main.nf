include { FETCH_JASPAR                           } from '../../../modules/local/motifs/fetch_jaspar'
include { CONVERT_MOTIFS as CONVERT_TO_UNIVERSAL } from '../../../modules/local/motifs/convert_motifs'
include { FILTER_MOTIFS                          } from '../../../modules/local/motifs/filter_motifs'
include { CONVERT_MOTIFS as CONVERT_TO_MEME      } from '../../../modules/local/motifs/convert_motifs'
include { CONVERT_MOTIFS as CONVERT_TO_TRANSFAC  } from '../../../modules/local/motifs/convert_motifs'
include { TRANSFAC_TO_PSEM                       } from '../../../modules/local/motifs/transfac_to_psem'

workflow MOTIFS {
    take:
    motifs
    ch_tfs
    taxon_id

    main:
    ch_versions = Channel.empty()

    // ch_taxon_id and ch_input_motifs are mutually exclusive
    if (motifs) {
        ch_motifs = Channel.value(motifs)
    }
    else {
        if (taxon_id) {
            // Fetch JASPAR motifs but only if taxon_id is provided
            FETCH_JASPAR(taxon_id)
            ch_versions = ch_versions.mix(FETCH_JASPAR.out.versions)
            ch_motifs = FETCH_JASPAR.out.motifs
        }
        else {
            error("Please provide a motifs file (--motifs) or a taxon ID (--taxon_id)")
        }
    }

    // Convert motifs to universal format (binary file format)
    CONVERT_TO_UNIVERSAL(
        ch_motifs.map { m -> [[id: 'motifs'], m, m.extension] },
        "universal",
    )
    ch_versions = ch_versions.mix(CONVERT_TO_UNIVERSAL.out.versions)

    // Filter motifs to only include those that match the TFs from the count data
    ch_filtered = FILTER_MOTIFS(CONVERT_TO_UNIVERSAL.out.converted, ch_tfs).filtered.map { meta, m -> [meta, m, "universal"] }
    ch_versions = ch_versions.mix(FILTER_MOTIFS.out.versions)

    // Convert to MEME and TRANSFAC and to PSEM (thermodynamic model)
    CONVERT_TO_MEME(ch_filtered, "meme")
    ch_versions = ch_versions.mix(CONVERT_TO_MEME.out.versions)

    CONVERT_TO_TRANSFAC(ch_filtered, "transfac")
    ch_versions = ch_versions.mix(CONVERT_TO_TRANSFAC.out.versions)

    TRANSFAC_TO_PSEM(CONVERT_TO_TRANSFAC.out.converted)
    ch_versions = ch_versions.mix(TRANSFAC_TO_PSEM.out.versions)

    emit:
    meme     = CONVERT_TO_MEME.out.converted
    psem     = TRANSFAC_TO_PSEM.out.psem
    versions = ch_versions
}
