#!/usr/bin/env python3

import pandas as pd
import platform

def format_yaml_like(data: dict, indent: int = 0) -> str:
    """Formats a dictionary to a YAML-like string.

    Args:
        data (dict): The dictionary to format.
        indent (int): The current indentation level.

    Returns:
        str: A string formatted as YAML.
    """
    yaml_str = ""
    for key, value in data.items():
        spaces = "  " * indent
        if isinstance(value, dict):
            yaml_str += f"{spaces}{key}:\\n{format_yaml_like(value, indent + 1)}"
        else:
            yaml_str += f"{spaces}{key}: {value}\\n"
    return yaml_str

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
df_affinities.columns = df_affinities.columns.str.replace(r"\\(.*\\)", "").str.strip()
df_affinities = df_affinities.groupby(df_affinities.columns, axis=1).agg(agg_method)

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
    f.write(format_yaml_like(versions))
