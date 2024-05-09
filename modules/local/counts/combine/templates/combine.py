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

df_genes = pd.read_csv("$gene_map", sep="\\t", index_col=0)

sample_files = dict(zip("${samples.join(' ')}".split(), [
    pd.read_csv(extra, header=None) for extra in "${extra_files.join(' ')}".split()]))

def remove_version(gene_id):
    return gene_id.split(".")[0]

counts = pd.read_csv("$counts", index_col=0, sep="\\t", header=None)

# If counts has no columns, add index name
if len(counts.columns) == 0:
    counts.index.name = "gene_id"
else:
    # Set first row as column names
    counts.columns = counts.iloc[0]
    # Remove first row
    counts = counts.iloc[1:]

for sample, sample_df in sample_files.items():
    counts[sample] = sample_df[0].to_list()

df_genes.index = df_genes.index.map(remove_version)
counts.index = counts.index.map(remove_version)

# Map gene ids to gene symbols
conversion_dict = df_genes["gene_name"].to_dict()
counts.index = counts.index.map(lambda x: conversion_dict.get(x, x)).str.upper()

# Keep only count values for genes which are present in the gene symbol mapping file
existing_symbols = df_genes["gene_name"].str.upper().to_list()
counts = counts[counts.index.isin(existing_symbols)]

counts = counts.groupby(counts.index).agg("$agg_method")

counts.to_csv("${meta.id}.clean.tsv", sep="\\t")
counts.index.to_series().to_csv("genes.txt", index=False, header=False)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
