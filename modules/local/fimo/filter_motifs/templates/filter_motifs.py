#!/usr/bin/env python3

from os import mkdir
from os.path import exists
from shutil import copy
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


tfs_jaspar_ids = "${tfs_jaspar_ids}"
jaspar_motifs = "${jaspar_motifs}"

# Read differentially expressed (DE) transcription factors (TF)
with open(tfs_jaspar_ids, "r") as f:
    tfs_jaspar_ids = f.read().split('\\n')

# Create directory for significant motif files
mkdir("sign_motifs")

# Iterate over TFs and store meme files for DE TFs
for jaspar_id in tfs_jaspar_ids:
    if exists(f"jaspar_motifs/{jaspar_id}.meme"):
        copy(f"jaspar_motifs/{jaspar_id}.meme", f"sign_motifs/{jaspar_id}.meme")


# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version()
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))