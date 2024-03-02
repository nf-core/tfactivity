#!/usr/bin/env python3

import argparse
import pandas as pd

# Define the command-line arguments
parser = argparse.ArgumentParser(description="Filter genes based on raw counts and TPM values.")
parser.add_argument("--counts", type=str, help="Path to counts")
parser.add_argument("--tpms", type=str, help="Path to TPM values")
parser.add_argument("--min_count", type=int, default=10, help="Minimum count value")
parser.add_argument("--min_tpm", type=float, default=1, help="Minimum TPM value")
parser.add_argument("--counts_output", type=str, help="Path to output counts")
parser.add_argument("--tpms_output", type=str, help="Path to output TPM values")
parser.add_argument("--genes_output", type=str, help="Path to output gene list")
args = parser.parse_args()

# Read the input files
df_counts = pd.read_csv(args.counts, index_col=0, header=0, sep="\t")
df_tpms = pd.read_csv(args.tpms, index_col=0, header=0, sep="\t")

# Filter based on sum of raw counts
df_counts = df_counts[df_counts.sum(axis=1) >= args.min_count]

# Filter based on average TPM value
df_tpms = df_tpms[df_tpms.mean(axis=1) >= args.min_tpm]

gene_intersection = df_counts.index.intersection(df_tpms.index)

# Subset the dataframes
df_counts = df_counts.loc[gene_intersection]
df_tpms = df_tpms.loc[gene_intersection]

# Rename index to gene_id
df_counts.index.name = "gene_id"
df_tpms.index.name = "gene_id"

# Write the output files
df_counts.to_csv(args.counts_output, sep="\t")
df_tpms.to_csv(args.tpms_output, sep="\t")

with open(args.genes_output, "w") as f:
    f.write("\n".join(gene_intersection))