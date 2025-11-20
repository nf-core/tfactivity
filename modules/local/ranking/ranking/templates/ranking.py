#!/usr/bin/env python3

import pandas as pd
import numpy as np
import statistics as st
import re
import scipy
import scipy.stats as stats
import platform
import yaml

agg_method = "$agg_method"
if agg_method not in ["mean", "max", "sum"]:
    raise ValueError("Invalid aggregation method. Must be one of 'mean', 'max', 'sum'.")

df_genes = pd.read_csv("$tf_tg_score".replace("\\\\", ""), sep='\\t', header=0, index_col=0)

# Parse column names to extract motif symbols
pattern = re.compile(r"^(?P<sym>[^()]+)\\((?P<id>[^()]+)\\)\$")
symbols = {}
for col in df_genes.columns:
    m = pattern.match(str(col))
    if not m:
        raise ValueError(f"Motif name '{col}' does not match expected format.")
    symbols[col] = m.group("sym")

# Precompute background collapsed by symbol
sym_series = pd.Series(symbols)
collapsed_all = df_genes.T.groupby(sym_series).agg(agg_method).T

# For each symbol, make a flattened background vector that EXCLUDES that symbol itself
# This avoids dependence between foreground and background
bkg_vec_by_sym = {}
bkg_med_by_sym = {}
for sym in collapsed_all.columns:
    bkg_mat = collapsed_all.drop(columns=[sym], errors='ignore')
    vec = bkg_mat.values.ravel()
    bkg_vec_by_sym[sym] = vec
    bkg_med_by_sym[sym] = st.median(vec)

def mann_whitney_u(background_vec: np.ndarray, foreground_vec: pd.Series) -> float:
    _, p = stats.mannwhitneyu(background_vec, foreground_vec.values)
    return float(p)

# Compute statistics for each TF
df_ranking = pd.DataFrame(index=df_genes.columns, columns=['sum', 'mean', 'q95', 'q99', 'median', 'p-value' 'bkg_median'])
df_ranking['sum'] = df_genes.sum()
df_ranking['mean'] = df_genes.mean()
df_ranking['q95'] = df_genes.quantile(0.95)
df_ranking['q99'] = df_genes.quantile(0.99)
df_ranking['median'] = df_genes.median()

# Compute p-values using Mann-Whitney U test against the dynamic background and background median
pvals = []
bkg_meds = []
for tf_col in df_genes.columns:
    sym = symbols[tf_col]
    bkg_vec = bkg_vec_by_sym[sym]
    pvals.append(mann_whitney_u(bkg_vec, df_genes[tf_col]))
    bkg_meds.append(bkg_med_by_sym[sym])

df_ranking['p-value'] = pvals
df_ranking['bkg_median'] = bkg_meds

# FDR correction using Benjamini-Hochberg
df_ranking.loc[pd.isna(df_ranking["p-value"]), "p-value"] = 1.0
df_ranking['p-value'] = stats.false_discovery_control(df_ranking["p-value"], method="bh")

# Filter using dynamic background median and alpha threshold
alpha = float("$alpha")
df_ranking = df_ranking[
    (df_ranking["median"] > df_ranking["bkg_median"]) &
    (df_ranking["p-value"] < alpha)
]

# Compute Rank and DCG
df_ranking.sort_values(by=['median'], ascending=False, inplace=True)
length = len(df_ranking.index)
df_ranking['rank'] = range(1, length + 1)
df_ranking['dcg'] = 1 - (df_ranking['rank'] - 1) / length

# Output TF ranking
df_ranking[['dcg']].to_csv("${meta.id}.tf_ranking.tsv", sep='\\t')

# Calculate gene-wise DCGs per TF
significant_tfs = df_ranking.index
df_genes = df_genes[significant_tfs]
df_genes = 1 - (df_genes.rank(ascending=False).astype(int) / len(df_genes.index))
df_genes.to_csv("${meta.id}.tg_ranking.tsv", sep='\\t')

# Versions
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
        "numpy": np.__version__,
        "scipy": scipy.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(yaml.dump(versions))
