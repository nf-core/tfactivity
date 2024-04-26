include { CONVERT_MOTIFS as CONVERT_TO_MEME     } from '../../modules/local/motifs/convert_motifs'
include { CONVERT_MOTIFS as CONVERT_TO_TRANSFAC } from '../../modules/local/motifs/convert_motifs'
include { TRANSFAC_TO_PSEM                      } from '../../modules/local/motifs/transfac_to_psem'

workflow MOTIFS {
    take:
    ch_input_motifs
    ch_taxon_id
    
    main:
    ch_motifs_type = ch_input_motifs.map { motifs -> [[id: 'motifs'], motifs, motifs.extension] }

    CONVERT_TO_MEME(ch_motifs_type, "meme")
    CONVERT_TO_TRANSFAC(ch_motifs_type, "transfac")
    TRANSFAC_TO_PSEM(CONVERT_TO_TRANSFAC.out)

    emit:
    meme = CONVERT_TO_MEME.out
    psem = TRANSFAC_TO_PSEM.out
}