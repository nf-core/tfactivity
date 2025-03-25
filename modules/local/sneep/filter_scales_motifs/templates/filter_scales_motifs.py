#!/usr/bin/env python3

import platform
import pandas as pd

def format_yaml_like(data: dict, indent: int = 0) -> str:
    """Formats a dictionary to a YAML-like string.

    Args:
        data (dict): The dictionary to format.
        indent (int): The current indentation level.

    Returns:
        str: A string formatted as YAML.
    """
    yaml_str = ""
    for key, value in data.items():
        spaces = "    " * indent
        if isinstance(value, dict):
            yaml_str += f"{spaces}{key}:\\n{format_yaml_like(value, indent + 1)}"
        else:
            yaml_str += f"{spaces}{key}: {value}\\n"
    return yaml_str

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
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
