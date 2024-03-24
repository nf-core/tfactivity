#!/usr/bin/env python3

import argparse
import pandas as pd
import statistics as st
import scipy.stats as stats

parser = argparse.ArgumentParser(description='Create TF ranking')
parser.add_argument('--input', type=str, help='Score file', required=True)
parser.add_argument('--alpha', type=float, help='Alpha value', required=True)
parser.add_argument('--output', type=str, help='Output file', required=True)

args = parser.parse_args()

df_genes = pd.read_csv(args.input, sep='\t', header=0, index_col=0)

# Save whole content of the dataframe in a single, flattened list
background = df_genes.values.flatten().tolist()
background_median = st.median(background)

def mann_whitney_u(background, foreground):
    _, p = stats.mannwhitneyu(background, foreground)
    return p

df_ranking = pd.DataFrame(columns=['sum', 'mean', 'q95', 'q99', 'median', 'p-value'])
# Transform df to have the following columns: sum, mean, q95, q99, median, p-value
df_ranking['sum'] = df_genes.sum()
df_ranking['mean'] = df_genes.mean()
df_ranking['q95'] = df_genes.quantile(0.95)
df_ranking['q99'] = df_genes.quantile(0.99)
df_ranking['median'] = df_genes.median()
df_ranking['p-value'] = df_genes.apply(lambda x: mann_whitney_u(background, x))

df_ranking = df_ranking[(df_ranking['median'] > background_median) & (df_ranking['p-value'] < args.alpha)]

df_ranking.sort_values(by=['median'], ascending=False, inplace=True)

length = len(df_ranking.index)
df_ranking['rank'] = range(1, length + 1)
df_ranking['dcg'] = 1 - (df_ranking['rank'] - 1) / length

df_ranking.to_csv(args.output, sep='\t')
