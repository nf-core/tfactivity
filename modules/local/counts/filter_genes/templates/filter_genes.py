#!/usr/bin/env python3

import pandas as pd
import platform
import yaml

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
df_counts.to_csv("${prefix}.counts_filtered.tsv", sep="\\t")
df_tpms.to_csv("${prefix}.tpm_filtered.tsv", sep="\\t")

with open("${prefix}.genes_filtered.txt", "w") as f:
    f.write("\\n".join(gene_intersection))

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
