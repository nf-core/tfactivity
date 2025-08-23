#!/usr/bin/env python3

import pandas as pd
import platform
import yaml


df_differential = pd.read_csv("$differential".replace("\\\\", ""), sep='\\t', index_col=0)
df_affinities = pd.read_csv("$affinities".replace("\\\\", ""), sep='\\t', index_col=0)
df_coefficients = pd.read_csv("$regression_coefficients".replace("\\\\", ""), sep='\\t', index_col=0)

# Make sure genes are in common between the differential expression and affinities files
gene_intersection = df_differential.index.intersection(df_affinities.index)
assert len(gene_intersection) > 0, "No genes found in common between the differential expression and affinities files"

df_affinities = df_affinities.loc[gene_intersection]
df_differential = df_differential.loc[gene_intersection]

# Aggregate duplicated genes from version clipping
df_affinities = df_affinities.groupby(df_affinities.index).mean()
df_differential = df_differential.groupby(df_differential.index).mean()

# Make sure TFs are in common between the affinities and coefficients files
tf_intersection = df_affinities.columns.intersection(df_coefficients.index)
assert len(tf_intersection) > 0, "No TFs found in common between the affinities and coefficients files"

df_affinities = df_affinities[tf_intersection]
df_coefficients = df_coefficients.loc[tf_intersection]


# Calculate the TF-TG scores

## Multiply the log2FC by the affinities
result = (df_affinities
            .mul(abs(df_differential["log2FoldChange"]), axis=0)
            .mul(abs(df_coefficients["value"]), axis=1))

## Make sure results are not empty
assert not result.empty, "No TF-TG scores were calculated"

# Save the result
result.to_csv("${meta.id}.score.tsv", sep='\\t')

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
