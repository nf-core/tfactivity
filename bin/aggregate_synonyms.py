#!/usr/bin/env python3

import pandas as pd
import argparse

parser = argparse.ArgumentParser(description="Aggregate affinities across synonym genes and TFs")
parser.add_argument("--input", type=str, help="Path to affinities")
parser.add_argument("--gene_map", type=str, help="Path to geneID - symbol mapping file")
parser.add_argument("--agg_method", type=str, help="Method to aggregate affinities", choices=["mean", "max", "sum"], default="max")
parser.add_argument("--output", type=str, help="Path to output file")
args = parser.parse_args()

df_affinities = pd.read_csv(args.input, index_col=0, header=0, sep="\t")
df_genes = pd.read_csv(args.gene_map, sep="\t", index_col=0)

df_affinities = df_affinities.drop(["NumPeaks", "AvgPeakDistance", "AvgPeakSize"], axis=1)

conversion_dict = df_genes["gene_name"].to_dict()
df_affinities.index = df_affinities.index.map(conversion_dict).str.upper()

# Aggregate across genes
df_affinities = df_affinities.groupby(df_affinities.index).agg(args.agg_method)

# Aggregate across TFs
df_affinities.columns = df_affinities.columns.str.replace(r"\(.*\)", "").str.strip()
df_affinities = df_affinities.groupby(df_affinities.columns, axis=1).agg(args.agg_method)

# Save to file
df_affinities.to_csv(args.output, sep="\t")
