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
    CONVERT_TO_UNIVERSAL(ch_input_motifs
        .map { motifs -> [[id: 'motifs'], motifs, motifs.extension] },
        "universal")

    ch_filtered = FILTER_MOTIFS(CONVERT_TO_UNIVERSAL.out, ch_tfs)
        .map{meta, motifs -> [meta, motifs, "universal"]}

    CONVERT_TO_MEME(ch_filtered, "meme")
    CONVERT_TO_TRANSFAC(ch_filtered, "transfac")
    TRANSFAC_TO_PSEM(CONVERT_TO_TRANSFAC.out)

    emit:
    meme = CONVERT_TO_MEME.out
    psem = TRANSFAC_TO_PSEM.out
}