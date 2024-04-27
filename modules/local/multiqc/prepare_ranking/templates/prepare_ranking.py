#!/usr/bin/env python3

import pandas as pd
import json
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

assay_path = dict(
    zip("${assays.join(' ')}".split(), 
        "${assay_paths.join(' ')}".split()))

assay_series = {
    assay: pd.read_csv(path, sep="\t", index_col=0, names=[assay], header=0)[assay]
    for assay, path in assay_path.items()
}

# Merge all dataframes
merged_df = pd.concat(assay_series,
                      axis=1,
                      sort=True,
                      join="outer")

with open("tf_ranking_mqc.json", "w+") as f:
    json.dump({
        "id": "tf_ranking",
        "section_name": "Ranking of Transcription Factors",
        "description": "This section contains the ranking of transcription factors based on the provided assays.",
        "plot_type": "table",
        "data": merged_df.to_dict(orient="index")
    }, f)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))