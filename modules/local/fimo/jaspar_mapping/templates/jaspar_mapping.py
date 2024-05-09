#!/usr/bin/env python3

from collections import defaultdict
import platform
import pandas as pd

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


path_tf_ranking = "${tf_ranking}"
path_pwm = "${pwm}"

# Read differentially expressed TFs
tf_ranking = pd.read_csv(path_tf_ranking, sep='\\t', index_col=0).index.tolist()

# Get mapping file
with open(path_pwm, 'r') as f:
    file = f.read()
mapping = [tuple(line[1:].split("\\t")[:2]) for line in file.split('\\n') if line.startswith('>')]

# Create mapping dict from mapping files
symbol_to_id = defaultdict(set)
for jaspar_id, symbol in mapping:
    symbol_to_id[symbol].add(jaspar_id)

# Cast defaultdict to dict
symbol_to_id = dict(symbol_to_id)

# Create file with sorted TF meme IDs
tfs = sorted([jaspar_id for tf in tf_ranking if tf in symbol_to_id for jaspar_id in symbol_to_id[tf]])

with open('tfs_jaspar_ids.txt', 'w') as f:
    for tf in tfs:
        f.write(f'{tf}\\n')


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
