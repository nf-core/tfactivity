#!/usr/bin/env python3

import pandas as pd
import platform
import yaml

df = pd.read_csv("$samplesheet", index_col=0, header=0)

df.index.name = "experiment_accession"
if "counts_file" in df.columns:
    df = df.drop("counts_file", axis=1)

# Keep only columns with more than one unique value
df = df.loc[:, df.nunique() > 1]

# Write the design matrix to a file
df.to_csv("${prefix}.design.csv")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
