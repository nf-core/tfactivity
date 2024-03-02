#!/usr/bin/env python3

import pandas as pd
import argparse

parser = argparse.ArgumentParser(description="Calculate TPM from count matrix and length information")
parser.add_argument("--counts", type=str, help="Path to counts")
parser.add_argument("--lengths", type=str, help="Path to gene lengths")
parser.add_argument("--output", type=str, help="Path to output file")
args = parser.parse_args()

df_counts = pd.read_csv(args.counts, index_col=0, header=0, sep="\t")
df_lengths = pd.read_csv(args.lengths, index_col=0, header=0, sep="\t", usecols=["gene", "merged"])
df_lengths.columns = ["length"]

def remove_version(gene_id):
    return gene_id.split(".")[0]

df_lengths.index = df_lengths.index.map(remove_version)

# Mean length for each gene (in kb)
df_lengths = df_lengths / 1e3
df_lengths = df_lengths.groupby(df_lengths.index).mean()

df_lengths = df_lengths.loc[df_counts.index]

# Calculate TPM
df_rpk = df_counts.div(df_lengths["length"], axis=0)
df_scale = df_rpk.sum() / 1e6
df_tpm = df_rpk.div(df_scale, axis=1)

# Save to file
df_tpm.to_csv(args.output, sep="\t")