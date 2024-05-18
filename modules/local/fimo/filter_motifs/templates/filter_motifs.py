#!/usr/bin/env python3

from os import mkdir
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


def split_meme_file(meme_file):
    lines = meme_file.split('\\n')
    header = []
    motifs = {}
    current_motif = []
    current_motif_name = ""
    is_header = True

    for line in lines:
        if line.startswith("MOTIF"):
            # List not empty -> not first motif
            if current_motif:
                motifs[current_motif_name] = '\\n'.join(header + current_motif)
                current_motif = []
            current_motif_name = line.split()[1]
            is_header = False
        if is_header:
            header.append(line)
        else:
            current_motif.append(line)

    if current_motif:
        motifs[current_motif_name] = '\\n'.join(header + current_motif)

    return motifs


path_jaspar_ids = "${tfs_jaspar_ids}"
path_motifs_meme = "${meme_motifs}"

# Read TF Jaspar IDs
with open(path_jaspar_ids, 'r') as f:
    jaspar_ids = f.read().strip().split('\\n')

# Read MEME motifs file
with open(path_motifs_meme, 'r') as f:
    motifs_meme = f.read().strip()

# Write motifs to separate files
mkdir('motifs')
motifs = split_meme_file(motifs_meme)
for jaspar_id in jaspar_ids:
    if jaspar_id in motifs:
        with open(f'motifs/{jaspar_id}.meme', 'w') as f:
            f.write(motifs[jaspar_id])

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version()
    }
}

# Write version file
with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
