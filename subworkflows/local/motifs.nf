include { FETCH_JASPAR                          } from '../../modules/local/motifs/fetch_jaspar'
include { CONVERT_MOTIFS as CONVERT_TO_UNIVERSAL} from '../../modules/local/motifs/convert_motifs'
include { FILTER_MOTIFS                         } from '../../modules/local/motifs/filter_motifs'
include { CONVERT_MOTIFS as CONVERT_TO_MEME     } from '../../modules/local/motifs/convert_motifs'
include { CONVERT_MOTIFS as CONVERT_TO_TRANSFAC } from '../../modules/local/motifs/convert_motifs'
include { TRANSFAC_TO_PSEM                      } from '../../modules/local/motifs/transfac_to_psem'

workflow MOTIFS {
    take:
    ch_input_motifs
    ch_tfs
    ch_taxon_id

    main:
    ch_versions = Channel.empty()

    FETCH_JASPAR(ch_taxon_id)

    // ch_taxon_id and ch_input_motifs are mutually exclusive
    ch_motifs = FETCH_JASPAR.out.motifs.mix(ch_input_motifs).first()

    CONVERT_TO_UNIVERSAL(ch_motifs
        .map { motifs -> [[id: 'motifs'], motifs, motifs.extension] },
        "universal")

    ch_filtered = FILTER_MOTIFS(CONVERT_TO_UNIVERSAL.out.converted, ch_tfs)
        .filtered.map{meta, motifs -> [meta, motifs, "universal"]}

    ch_versions = ch_versions.mix(FETCH_JASPAR.out.versions)
    ch_versions = ch_versions.mix(CONVERT_TO_UNIVERSAL.out.versions)
    ch_versions = ch_versions.mix(FILTER_MOTIFS.out.versions)

    CONVERT_TO_MEME(ch_filtered, "meme")
    CONVERT_TO_TRANSFAC(ch_filtered, "transfac")
    TRANSFAC_TO_PSEM(CONVERT_TO_TRANSFAC.out.converted)

    ch_versions = ch_versions.mix(CONVERT_TO_MEME.out.versions)
    ch_versions = ch_versions.mix(CONVERT_TO_TRANSFAC.out.versions)
    ch_versions = ch_versions.mix(TRANSFAC_TO_PSEM.out.versions)

    emit:
    meme = CONVERT_TO_MEME.out.converted
    psem = TRANSFAC_TO_PSEM.out.psem

    versions = ch_versions
}
