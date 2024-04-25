process JASPAR_MAPPING {
    label 'process_single'

    conda "conda-forge::pandas==1.5.2"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/pandas:1.5.2':
        'biocontainers/pandas:1.5.2' }"

    input:
        tuple val(meta), path(tf_ranking)
        path pwm

    output:
        tuple val(meta), path("tfs_jaspar_ids.txt")

    script:
    """
        #!/usr/bin/env python3

        from collections import defaultdict
        import pandas as pd

        path_tf_ranking = "${tf_ranking}"
        path_pwm = "${pwm}"

        # Read differentially expressed TFs
        tf_ranking = pd.read_csv(path_tf_ranking, sep='\\t', index_col=0).index.tolist()

        # Get mapping file
        with open(path_pwm, 'r') as f:
            file = f.read()
        mapping = [tuple(line[1:].split("\\t")[:2]) for line in file.split('\\n') if line.startswith('>')]

        # Create mapping dict from mapping files
        symbol_to_id = defaultdict(set)
        for jaspar_id, symbol in mapping:
            symbol_to_id[symbol].add(jaspar_id)

        # Cast defaultdict to dict
        symbol_to_id = dict(symbol_to_id)

        # Create file with sorted TF meme IDs
        tfs = sorted([jaspar_id for tf in tf_ranking if tf in symbol_to_id for jaspar_id in symbol_to_id[tf]])

        with open('tfs_jaspar_ids.txt', 'w') as f:
            for tf in tfs:
                f.write(f'{tf}\\n')
    """

    stub:
    """
        touch tfs_jaspar_ids.txt
    """
}
