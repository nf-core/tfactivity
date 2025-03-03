#!/usr/bin/env python3

import pandas as pd
import platform

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
        spaces = "  " * indent
        if isinstance(value, dict):
            yaml_str += f"{spaces}{key}:\\n{format_yaml_like(value, indent + 1)}"
        else:
            yaml_str += f"{spaces}{key}: {value}\\n"
    return yaml_str

# Read the input files
df_counts = pd.read_csv("$counts", index_col=0, header=0, sep="\\t")
df_tpms = pd.read_csv("$tpms", index_col=0, header=0, sep="\\t")

# Filter based on sum of raw counts
df_counts = df_counts[df_counts.sum(axis=1) >= int("$min_count")]

# Filter based on average TPM value
df_tpms = df_tpms[df_tpms.mean(axis=1) >= float("$min_tpm")]

gene_intersection = df_counts.index.intersection(df_tpms.index)

# Subset the dataframes
df_counts = df_counts.loc[gene_intersection]
df_tpms = df_tpms.loc[gene_intersection]

# Rename index to gene_id
df_counts.index.name = "gene_id"
df_tpms.index.name = "gene_id"

# Write the output files
df_counts.to_csv("${meta.id}.counts_filtered.tsv", sep="\\t")
df_tpms.to_csv("${meta.id}.tpm_filtered.tsv", sep="\\t")

with open("${meta.id}.genes_filtered.txt", "w") as f:
    f.write("\\n".join(gene_intersection))

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
