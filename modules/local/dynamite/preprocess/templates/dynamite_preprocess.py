#!/usr/bin/env python3

# Based on https://github.com/SchulzLab/TEPIC/blob/master/MachineLearningPipelines/DYNAMITE/Scripts/integrateData.py

import pandas as pd
import platform
import yaml

df_affinities = pd.read_csv("$affinity_ratio".replace("\\\\", ""), sep="\\t", index_col=0)
df_expression = pd.read_csv("$differential_expression".replace("\\\\", ""), sep="\\t", index_col=0)

gene_intersection = df_affinities.index.intersection(df_expression.index)

df_affinities = df_affinities.loc[gene_intersection]
df_expression = df_expression.loc[gene_intersection]

# Aggregate duplicated genes from version clipping
df_affinities = df_affinities.groupby(df_affinities.index).mean()
df_expression = df_expression.groupby(df_expression.index).mean()

df_affinities["Expression"] = 0
df_affinities.loc[df_expression["log2FoldChange"] > 0, "Expression"] = 1

df_affinities.to_csv("${meta.id}.preprocessed.tsv", sep="\\t")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
