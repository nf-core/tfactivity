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
merged_df.fillna(0, inplace=True)

main_id = "tf_ranking"
main_name = "Transcription Factors"
main_description = "This section contains the ranking of transcription factors based on the provided assays."

with open("tf_ranking_mqc.json", "w+") as f:
    json.dump({
        "id": main_id,
        "section_name": main_name,
        "description": main_description
    }, f, indent=4)

with open("overview_mqc.json", "w+") as f:
    json.dump({
        "id": f"tf_overview",
        "parent_id": main_id,
        "parent_name": main_name,
        "parent_description": main_description,
        "section_name": "Ranking",
        "description": "This section contains the ranking of all transcription factors based on the provided assays.",
        "plot_type": "table",
        "data": merged_df.to_dict(orient="index")
    }, f, indent=4)

for tf in merged_df.index:
    with open(f"tf_{tf}_mqc.json", "w+") as f:
        json.dump({
            "id": f"tf_{tf}",
            "parent_id": main_id,
            "parent_name": main_name,
            "parent_description": main_description,
            "section_name": tf,
            "description": f"This section contains the ranking of {tf} based on the provided assays.",
            "plot_type": "bargraph",
            "data": merged_df.loc[[tf]].to_dict()
        }, f, indent=4)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
