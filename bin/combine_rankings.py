#!/usr/bin/env python3

import argparse
import pandas as pd

parser = argparse.ArgumentParser(description='Combine TF rankings')
parser.add_argument('--input', type=str, nargs='+', help='Assay specific score files', required=True)
parser.add_argument('--output', type=str, help='Output file', required=True)

args = parser.parse_args()

dfs = [pd.read_csv(f, sep='\t', header=0, index_col=0) for f in args.input]
df = pd.concat([df[['dcg']] for df in dfs])

df = df.groupby(df.index).sum()

# Todo: Check if we should use number of comparisons per assay as weights
# In this case, the next line should be commented out
df["dcg"] = df["dcg"] / len(dfs)

df.sort_values(by=['dcg'], ascending=False, inplace=True)

df['rank'] = range(1, len(df.index) + 1)

df.to_csv(args.output, sep='\t', index=True)
