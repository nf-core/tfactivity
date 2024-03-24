include { CREATE } from '../../modules/local/report/create/main'

workflow REPORT {
    take:
    ch_assay_rankings

    main:
    CREATE(ch_assay_rankings.map{meta, ranking -> ranking}
                            .collect()
                            .map{rankings -> [[id: "ranking"], rankings]},
            params, Channel.value(file(projectDir + "/nextflow_schema.json")))
}