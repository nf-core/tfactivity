#!/usr/bin/env python3

import platform
import pandas as pd
import yaml

output_tsv = "${meta.id}.tsv"
output_gff = "${meta.id}.gff"

gff_dfs = []
for gff_path in "${gffs}".split():
    df_gff = pd.read_csv(gff_path, sep='\\t', comment='#', header=None, dtype=str)
    gff_dfs.append(df_gff)

df_gff = pd.concat(gff_dfs, ignore_index=True)
df_gff = df_gff.sort_values(by=[1, 4, 5])
df_gff.to_csv(output_gff, sep='\\t', index=False, header=False)

tsv_dfs = []
for tsv_path in "${tsvs}".split():
    df_tsv = pd.read_csv(tsv_path, sep='\\t', comment='#', dtype=str)
    tsv_dfs.append(df_tsv)

df_tsv = pd.concat(tsv_dfs, ignore_index=True)
df_tsv = df_tsv.sort_values(by=["motif_id", "sequence_name", "start", "stop"])
df_tsv.to_csv(output_tsv, sep='\\t', index=False, header=True)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
