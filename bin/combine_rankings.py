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

df.sort_values(by=['dcg'], ascending=False, inplace=True)

df['rank'] = range(1, len(df.index) + 1)
df['dcg'] = 1 - (df['rank'] / len(df.index))

df.drop(columns=['rank'], inplace=True)

df.to_csv(args.output, sep='\t', index=True)
