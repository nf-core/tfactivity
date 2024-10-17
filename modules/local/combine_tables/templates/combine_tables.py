#!/usr/bin/env python3

import numpy as np
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

method = "$method"
if method not in ["mean", "sum", "ratio", "rank"]:
    raise ValueError("Invalid method. Must be one of 'mean', 'sum', 'ratio', 'rank'.")

# Read all input files into a list of dataframes
dfs = [pd.read_csv(file, sep='\\t', index_col=0) for file in "${files.join(' ')}".split()]

if method in ["sum", "rank"]:
    index_union = dfs[0].index
    col_union = dfs[0].columns
    for df in dfs[1:]:
        index_union = index_union.union(df.index)
        col_union = col_union.union(df.columns)

    # Add zero values for missing rows
    dfs = [df.reindex(index_union).fillna(0, inplace=False) for df in dfs]
    dfs = [df.reindex(columns=col_union).fillna(0, inplace=False) for df in dfs]
else:
    index_intersection = dfs[0].index
    for df in dfs[1:]:
        index_intersection = index_intersection.intersection(df.index)

    print(f"Number of rows in intersection: {len(index_intersection)}")
    # Keep row indices which are available in all dataframes
    dfs = [df.loc[index_intersection] for df in dfs]

# Check if all dataframes have the same dimensions
if not all(df.shape == dfs[0].shape for df in dfs):
    raise ValueError(f"The input files must have the same dimensions. Got: {[df.shape for df in dfs]}")

# Check if all dataframes have the same row names
if not all(df.index.equals(dfs[0].index) for df in dfs):
    raise ValueError("The input files must have the same row names.")

# Check if all dataframes have the same column names
if not all(df.columns.equals(dfs[0].columns) for df in dfs):
    raise ValueError("The input files must have the same column names.")

# Calculate the selected statistic
if method == "mean":
    result = sum(dfs) / len(dfs)
elif method == "rank":
    result = 1 - (sum(dfs).rank(ascending=False) / len(dfs[0].index))
elif method == "sum":
    result = sum(dfs)
elif method == "ratio":
    if len(dfs) != 2:
        raise ValueError("The ratio method requires exactly two input files.")

    # Replace 0 values with minimal existing float value
    dfs[1] = dfs[1].replace(0, np.finfo(float).eps)

    result = dfs[0] / dfs[1]

    print(f"Number of rows before dropping NA or inf values: {len(result)}")

    # Drop rows with NA or inf values (requirement for DYNAMITE)
    result = result.replace([np.inf, -np.inf], np.nan).dropna()

    print(f"Number of rows after dropping NA or inf values: {len(result)}")

# Write the result to a file
result.to_csv("${prefix}.${extension}", sep='\\t', index=True, quoting=0)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
        "numpy": np.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
