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
    remove_duplicates

    main:
    ch_versions = Channel.empty()

    if (motifs) {
        ch_motifs = Channel.value(motifs)
    }
    else {
        if (taxon_id) {
            FETCH_JASPAR(taxon_id)
            ch_versions = ch_versions.mix(FETCH_JASPAR.out.versions)
            ch_motifs = FETCH_JASPAR.out.motifs
        }
        else {
            error("Please provide a motifs file (--motifs) or a taxon ID (--taxon_id)")
        }
    }

    CONVERT_TO_UNIVERSAL(
        ch_motifs.map { m -> [[id: 'motifs'], m, m.extension] },
        "universal",
    )
    ch_versions = ch_versions.mix(CONVERT_TO_UNIVERSAL.out.versions)

    ch_filtered = FILTER_MOTIFS(CONVERT_TO_UNIVERSAL.out.converted, ch_tfs, remove_duplicates).filtered.map { meta, m -> [meta, m, "universal"] }
    ch_versions = ch_versions.mix(FILTER_MOTIFS.out.versions)

    // Output warnings for removed duplicate motifs
    FILTER_MOTIFS.out.python_output
        .splitText() { it.trim() }
        .filter { it.startsWith("Removing duplicate motif with symbol") }
        .subscribe { log.warn(it) }

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
