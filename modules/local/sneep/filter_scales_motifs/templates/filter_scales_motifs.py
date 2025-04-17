#!/usr/bin/env python3

import platform
import pandas as pd
import yaml


# Read TF symbols from motif_regions file
symbols = set()
for tf_id_file in "${motif_regions}".split(' '):
    with open(tf_id_file, 'r') as f:
        for line in f:
            misc = line.split('\\t')[8]
            misc = {entry.split('=')[0]: entry.split('=')[1] for entry in misc.strip('\\n;').split(';')}
            symbols.add(misc['Alias'].lower())

# Subset scales file
scale = pd.read_csv("${scale_file}", sep='\\t')
scale = scale[scale.motif.str.lower().isin(symbols)]
scale.to_csv("filtered_${scale_file}", sep='\\t', index=False)

# Subset transfac file
with open("${motifs_transfac}", "r") as fin, open("filtered_${motifs_transfac}", 'w') as fout:
    entry = []
    keep = False

    for line in fin:
        entry.append(line)

        if line.startswith("ID "):
            symbol = line.strip().split()[1]
            keep = symbol.lower() in symbols

        if line.strip() == "//":
            if keep:
                fout.writelines(entry)
            entry = []
            keep = False


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
        "yaml": yaml.__version__,
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
