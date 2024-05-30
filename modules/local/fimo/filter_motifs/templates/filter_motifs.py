#!/usr/bin/env python3

from os import mkdir
import pandas as pd
import platform
from collections import defaultdict


def parse_meme_file(path_meme_file):
    with open(path_meme_file, "r") as f:
        meme_file = f.read()

    lines = meme_file.split('\\n')
    header = []
    meme_to_matrix = {}
    symbol_to_meme = defaultdict(set)
    current_motif = []
    current_motif_meme = ""
    is_header = True

    for line in lines:
        if line.startswith("MOTIF"):
            # List not empty -> not first motif
            if current_motif:
                meme_to_matrix[current_motif_meme] = '\\n'.join(header + current_motif)
                current_motif = []
            current_motif_meme, current_motif_symbol = line.split()[1:3]
            symbol_to_meme[current_motif_symbol].add(current_motif_meme)
            is_header = False
        if is_header:
            header.append(line)
        else:
            current_motif.append(line)

    if current_motif:
        meme_to_matrix[current_motif_meme] = '\\n'.join(header + current_motif)

    return meme_to_matrix, symbol_to_meme


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


tfs_ranking_file = '${tfs_jaspar_ids}'
path_meme_file = '${meme_motifs}'


# Parse tfs_ranking
tfs_ranking = pd.read_csv(tfs_ranking_file, sep='\\t', index_col=0).index.tolist()

# Parse meme file
meme_to_matrix, symbol_to_meme = parse_meme_file(path_meme_file)

mkdir('motifs')
for symbol in tfs_ranking:
    if symbol not in symbol_to_meme:
        # Check if symbol without version is in dictionary
        base_symbol = symbol.split('.')[0]
        if base_symbol not in symbol_to_meme:
            print(f'Symbol {symbol} not found')
            continue
        # Remove version from symbol
        symbol = base_symbol
    for meme_id in symbol_to_meme[symbol]:
        with open(f'motifs/{meme_id}.meme', 'w') as f:
            f.write(meme_to_matrix[meme_id])


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pandas": pd.__version__,
    }
}

# Write version file
with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
