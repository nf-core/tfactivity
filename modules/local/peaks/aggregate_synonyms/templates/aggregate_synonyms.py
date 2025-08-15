#!/usr/bin/env python3

import pandas as pd
import re
from collections import defaultdict
import platform
import yaml

agg_method = "$agg_method"
if agg_method not in ["mean", "max", "sum"]:
    raise ValueError("Invalid aggregation method. Must be one of 'mean', 'max', 'sum'.")

df_affinities = pd.read_csv("$affinities", index_col=0, header=0, sep="\\t")
df_genes = pd.read_csv("$gene_map", sep="\\t", index_col=0)

df_affinities = df_affinities.drop(["NumPeaks", "AvgPeakDistance", "AvgPeakSize"], axis=1)

conversion_dict = df_genes["gene_name"].to_dict()
df_affinities.index = df_affinities.index.map(conversion_dict).str.upper()

# Aggregate across genes
df_affinities = df_affinities.groupby(df_affinities.index).agg(agg_method)

# Aggregate across TFs
if "$merge_duplicate_motifs" == "true":
    # Match "Symbol(ID)" and capture sym and id
    pattern = re.compile(r"^(?P<sym>[^()]+?)(?:\\((?P<id>[^()]+)\\))?\$")
    symbol_to_id = defaultdict(list)  # sym -> list of ids
    col_map = defaultdict(list)       # sym -> list of original column names
    symbol_order = []                 # preserve first seen order

    for col in df_affinities.columns:
        m = pattern.match(col)

        if not m:
            raise ValueError(f"Motif name '{col}' does not match expected format.")

        sym = m.group("sym").strip()
        id_ = m.group("id").strip()
        if sym not in symbol_order:
            symbol_order.append(sym)
        symbol_to_id[sym].append(id_)
        col_map[sym].append(col)

    new_cols = []
    new_data = []

    for sym in symbol_order:
        ids = symbol_to_id[sym]
        cols = col_map[sym]
        if len(cols) > 1:
            print(f"Merging duplicate motif in '{'$meta.id'}' with symbol '{sym}' and IDs: {', '.join(ids)}")
            merged = df_affinities[cols].T.agg(agg_method).T
            new_cols.append(sym)
            new_data.append(merged)
        else:
            new_cols.append(cols[0])
            new_data.append(df_affinities[cols[0]])

    df_affinities = pd.concat(new_data, axis=1)
    df_affinities.columns = new_cols

# Save to file
df_affinities.to_csv("${meta.id}.agg_affinities.tsv", sep="\\t")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
