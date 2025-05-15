#!/usr/bin/env python3
# coding: utf-8

import pandas as pd
import numpy as np
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


marks = "${marks.join(' ')}".split()

# Read emissions file for the provided marks
emissions = pd.read_csv("$emissions", sep = "\\t")[["State (Emission order)"] + marks].rename(columns={"State (Emission order)": "State"})


# Read input bed file
bed = pd.read_csv("$bed",
                  sep="\\t",
                  skiprows=1,
                  names=["chr", "start", "end", "state", "score", "strand", "start_1", "end_1", "rgb"]
                 )


# Keep state if any of the marks is enriched > threshold for this state
states = emissions[np.any([emissions[mark] >= float("$threshold") for mark in marks], axis=0)]["State"].tolist()


# Subset bed file for selected states
bed = bed[np.isin(bed["state"], states)].drop(columns=["state"])
bed["name"] = bed["chr"] + ":" + bed["start"].astype(str) + "-" + bed["end"].astype(str)

bed = bed[["chr", "start", "end", "name", "score", "strand"]]

# Write output
bed.to_csv("$output_file", index=False, sep="\\t", header=False)


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
        "numpy": np.__version__,
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
