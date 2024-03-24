include { CREATE } from '../../modules/local/report/create/main'

workflow REPORT {
    take:
    ch_tf_ranking
    ch_tg_ranking

    main:
    CREATE(ch_tf_ranking.map{meta, ranking -> ranking}
                            .collect()
                            .map{rankings -> [[id: "tfs"], rankings]},
              ch_tg_ranking.map{meta, ranking -> ranking}
                            .collect()
                            .map{rankings -> [[id: "tgs"], rankings]},
            params, Channel.value(file(projectDir + "/nextflow_schema.json")))
}