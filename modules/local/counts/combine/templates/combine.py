#!/usr/bin/env python3

import pandas as pd
import platform
import yaml
import sys

df_genes = pd.read_csv("$gene_map", sep="\\t", index_col=0)

sample_files = dict(zip("${samples.join(' ')}".split(), [
    pd.read_csv(extra, header=None) for extra in "${extra_files.join(' ')}".split()]))

def remove_version(gene_id):
    return gene_id.split(".")[0]

counts = pd.read_csv("$counts", index_col=0, header=None)

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
mapped_index = counts.index.map(lambda x: conversion_dict.get(x, x)).str.upper()

# Calculate how many genes are not present in the mapping file
existing_symbols = df_genes["gene_name"].str.upper().to_list()
n_total = len(counts)
n_missing = (~mapped_index.isin(existing_symbols)).sum()
if n_total > 0 and n_missing / n_total > 0.10:
    sys.stderr.write(
        f"Error: {n_missing} out of {n_total} genes ({100 * n_missing/n_total:.1f}%) are not present in the GTF file. Please make sure the GTF file is the same as the one used to generate the counts. Aborting.\\n"
    )
    sys.exit(1)

counts.index = mapped_index

# Keep only count values for genes which are present in the gene symbol mapping file
counts = counts[counts.index.isin(existing_symbols)]

counts = counts.groupby(counts.index).agg("$agg_method")

counts.to_csv("${prefix}.clean.tsv", sep="\\t")
counts.index.to_series().to_csv("genes.txt", index=False, header=False)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
