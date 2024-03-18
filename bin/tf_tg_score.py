#!/usr/bin/env python3

import pandas as pd
import argparse

parser = argparse.ArgumentParser(description='Calculate TF-TG scores')
parser.add_argument('--differential', type=str, help='Differential expression file')
parser.add_argument('--affinities', type=str, help='Affinity file')
parser.add_argument('--regression_coefficients', type=str, help='Regression coefficients file')
parser.add_argument('--output', type=str, help='Output file')

args = parser.parse_args()

def remove_version(gene_id):
    return gene_id.split(".")[0]

df_differential = pd.read_csv(args.differential, sep='\t', index_col=0)
df_affinities = pd.read_csv(args.affinities, sep='\t', index_col=0)
df_coefficients = pd.read_csv(args.regression_coefficients, sep='\t', index_col=0)

# Remove version from gene ids
df_differential.index = df_differential.index.map(remove_version)
df_affinities.index = df_affinities.index.map(remove_version)

# Make sure genes are in common between the differential expression and affinities files
gene_intersection = df_differential.index.intersection(df_affinities.index)
assert len(gene_intersection) > 0, "No genes found in common between the differential expression and affinities files"

df_affinities = df_affinities.loc[gene_intersection]
df_differential = df_differential.loc[gene_intersection]

# Make sure TFs are in common between the affinities and coefficients files
tf_intersection = df_affinities.columns.intersection(df_coefficients.index)
assert len(tf_intersection) > 0, "No TFs found in common between the affinities and coefficients files"

df_affinities = df_affinities[tf_intersection]
df_coefficients = df_coefficients.loc[tf_intersection]


# Calculate the TF-TG scores

## Multiply the log2FC by the affinities
result = df_affinities \
            .mul(abs(df_differential["log2FoldChange"]), axis=0) \
            .mul(abs(df_coefficients["value"]), axis=1)

## Make sure results are not empty
assert not result.empty, "No TF-TG scores were calculated"

# Save the result
result.to_csv(args.output, sep='\t')
