include { CREATE } from '../../modules/local/report/create/main'

workflow REPORT {
    take:
    ch_tf_ranking
    ch_tg_ranking
    ch_differential

    main:
    ch_versions = Channel.empty()

    CREATE(ch_tf_ranking.map{meta, ranking -> ranking}
                            .collect()
                            .map{rankings -> [[id: "tfs"], rankings]},
              ch_tg_ranking.map{meta, ranking -> ranking}
                            .collect()
                            .map{rankings -> [[id: "tgs"], rankings]},
                ch_differential.map{meta, diff -> diff}
                            .collect()
                            .map{diffs -> [[id: "diffs"], diffs]},
            params, Channel.value(file(projectDir + "/nextflow_schema.json")))

    ch_versions = ch_versions.mix(CREATE.out.versions)

    emit:
    versions = ch_versions
}