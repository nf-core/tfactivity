#!/usr/bin/env python3

import pandas as pd
import argparse
import os

parser = argparse.ArgumentParser(description="Create dataframe from count matrix and metadata")
parser.add_argument("--counts", type=str, help="Path to counts")
parser.add_argument("--metadata", type=str, help="Path to metadata")
parser.add_argument("--gene_map", type=str, help="Path to geneID - symbol mapping file")
parser.add_argument("--agg_method", type=str, help="Aggregation method for counts", choices=["sum", "mean", "max"], default="sum")
parser.add_argument("--output", type=str, help="Path to output file")
args = parser.parse_args()

metadata = pd.read_csv(args.metadata, index_col=0, header=0)
df_genes = pd.read_csv(args.gene_map, sep="\t", index_col=0)

def remove_version(gene_id):
    return gene_id.split(".")[0]

if not os.path.exists(args.counts):
    raise Exception("Counts input does not exist")

if not os.path.isfile(args.counts):
    raise Exception("Counts input is not a file")

counts = pd.read_csv(args.counts, index_col=0, sep="\t", header=None)

# If counts has no columns, add index name
if len(counts.columns) == 0:
    counts.index.name = "gene_id"
else:
    # Set first row as column names
    counts.columns = counts.iloc[0]
    # Remove first row
    counts = counts.iloc[1:]

for index, row in metadata.iterrows():
    if row["counts_file"]:
        sample_df = pd.read_csv(row["counts_file"], header=None)
        sample_counts = sample_df[0].to_list()
        counts[index] = sample_counts

samples = metadata.index.to_list()

if not all([sample in counts.columns for sample in samples]):
    raise Exception("Not all samples are in the counts matrix")

df_genes.index = df_genes.index.map(remove_version)
counts.index = counts.index.map(remove_version)

# Map gene ids to gene symbols
conversion_dict = df_genes["gene_name"].to_dict()
counts.index = counts.index.map(lambda x: conversion_dict.get(x, x)).str.upper()

# Keep only count values for genes which are present in the gene symbol mapping file
existing_symbols = df_genes["gene_name"].str.upper().to_list()
counts = counts[counts.index.isin(existing_symbols)]

counts = counts.groupby(counts.index).agg(args.agg_method)

counts.to_csv(args.output, sep="\t")
counts.index.to_series().to_csv("genes.txt", index=False, header=False)
