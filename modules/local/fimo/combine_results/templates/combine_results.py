#!/usr/bin/env python3

import platform
import yaml

output_tsv = "${meta.id}.tsv"
output_gff = "${meta.id}.gff"

with open(output_gff, 'w') as gff_out:
    for gff_path in "${gffs}".split():
        with open(gff_path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    gff_out.write(line + "\\n")

with open(output_tsv, 'w') as tsv_out:
    tsv_out.write('motif_id\\tmotif_alt_id\\tsequence_name\\tstart\\tstop\\tstrand\\tscore\\tp-value\\tq-value\\tmatched_sequence\\n')

    for tsv_path in "${tsvs}".split():
        with open(tsv_path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and not line.startswith('motif_id'):
                    tsv_out.write(line + "\\n")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version()
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
