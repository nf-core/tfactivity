#!/usr/bin/env python3

import pandas as pd
import statistics as st
import scipy
import scipy.stats as stats
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

df_genes = pd.read_csv("$tf_tg_score".replace("\\\\", ""), sep='\\t', header=0, index_col=0)

# Save whole content of the dataframe in a single, flattened list
background = df_genes.values.flatten().tolist()
background_median = st.median(background)

def mann_whitney_u(background, foreground):
    _, p = stats.mannwhitneyu(background, foreground)
    return p

df_ranking = pd.DataFrame(columns=['sum', 'mean', 'q95', 'q99', 'median', 'p-value'])
df_ranking['sum'] = df_genes.sum()
df_ranking['mean'] = df_genes.mean()
df_ranking['q95'] = df_genes.quantile(0.95)
df_ranking['q99'] = df_genes.quantile(0.99)
df_ranking['median'] = df_genes.median()
df_ranking['p-value'] = df_genes.apply(lambda x: mann_whitney_u(background, x))

df_ranking = df_ranking[(df_ranking['median'] > background_median) & (df_ranking['p-value'] < float("$alpha"))]

df_ranking.sort_values(by=['median'], ascending=False, inplace=True)

length = len(df_ranking.index)
df_ranking['rank'] = range(1, length + 1)
df_ranking['dcg'] = 1 - (df_ranking['rank'] - 1) / length

df_ranking = df_ranking[['dcg']]
df_ranking.to_csv("${meta.id}.tf_ranking.tsv", sep='\\t')

# Save gene-wise DCGs per TF
significant_tfs = df_ranking.index
df_genes = df_genes[significant_tfs]

# Calculate gene-wise DCGs per TF
df_genes = 1 - (df_genes.rank(ascending=False).astype(int) / len(df_genes.index))
df_genes.to_csv("${meta.id}.tg_ranking.tsv", sep='\\t')


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
        "scipy": scipy.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
