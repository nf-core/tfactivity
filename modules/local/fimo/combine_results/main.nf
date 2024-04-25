process COMBINE_RESULTS {
    label 'process_single'

    conda 'conda-forge::python==3.9.5'
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/python:3.9--1':
        'biocontainers/python:3.9--1' }"

    input:
        path motif_files
    
    output:
        path "fimo.tsv", emit: tsv
        path "fimo.gff", emit: gff
    
    script:
    motif_files = motif_files.join(",")
    """
    #!/usr/bin/env python3

    output_dirs = "${motif_files}".split(',')
    
    tsvs = []
    gffs = []
    for output in output_dirs:
        with open(f'{output}/fimo.tsv', 'r') as f:
            tsv = f.read().split('\\n')
        with open(f'{output}/fimo.gff', 'r') as f:
            gff = f.read().split('\\n')
        
        tsvs.extend(tsv)
        gffs.extend(gff)

    tsvs = [line for line in tsvs if not line.startswith('#') and not line.startswith('motif_id') and not line == '']
    gffs = [line for line in gffs if not line.startswith('#') and not line == '']

    tsvs = ['motif_id\\tmotif_alt_id\\tsequence_name\\tstart\\tstop\\tstrand\\tscore\\tp-value\\tq-value\\tmatched_sequence'] + tsvs

    with open('fimo.tsv', 'w') as f:
        f.write('\\n'.join(tsvs))

    with open('fimo.gff', 'w') as f:
        f.write('\\n'.join(gffs))
    """

    stub:
    """
    touch fimo.tsv
    touch fimo.gff
    """

    
}