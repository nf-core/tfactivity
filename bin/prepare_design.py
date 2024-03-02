#!/usr/bin/env python3

import argparse
import pandas as pd

# Define the command-line arguments
parser = argparse.ArgumentParser(description="Prepare design matrix for usage with DeSeq2.")
parser.add_argument("--input", type=str, help="Path to sample matrix")
parser.add_argument("--output", type=str, help="Path to output design matrix")
args = parser.parse_args()

df = pd.read_csv(args.input, index_col=0, header=0)

df.index.name = "experiment_accession"
df = df.drop("counts_file", axis=1)

# Keep only columns with more than one unique value
df = df.loc[:, df.nunique() > 1]

# Write the design matrix to a file
df.to_csv(args.output)