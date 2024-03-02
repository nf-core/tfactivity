#!/usr/bin/env python3

# Based on https://github.com/SchulzLab/TEPIC/blob/master/MachineLearningPipelines/DYNAMITE/Scripts/integrateData.py

import pandas as pd
import argparse

parser=argparse.ArgumentParser(prog="annotateTSS.py")
parser.add_argument("--affinities", type=str, help="TEPIC gene-TF scores")
parser.add_argument("--expression", type=str, help="DeSeq2 differential expression data")
parser.add_argument("--output", type=str, help="File to write the combined data to")
args=parser.parse_args()

df_affinities = pd.read_csv(args.affinities, sep="\t", index_col=0)
df_expression = pd.read_csv(args.expression, sep="\t", index_col=0)

def remove_version(gene_id):
    return gene_id.split(".")[0]

df_affinities.index = df_affinities.index.map(remove_version)
df_expression.index = df_expression.index.map(remove_version)

gene_intersection = df_affinities.index.intersection(df_expression.index)

df_affinities = df_affinities.loc[gene_intersection]
df_expression = df_expression.loc[gene_intersection]

df_affinities = df_affinities.drop(["NumPeaks", "AvgPeakDistance", "AvgPeakSize"], axis=1)

df_affinities["Expression"] = 0
df_affinities.loc[df_expression["log2FoldChange"] > 0, "Expression"] = 1

df_affinities.to_csv(args.output, sep="\t")