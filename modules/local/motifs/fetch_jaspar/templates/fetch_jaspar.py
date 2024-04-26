#!/usr/bin/env python3

import pyjaspar
from pyjaspar import jaspardb
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

jdb = jaspardb(release='JASPAR2024')

motifs = jdb.fetch_motifs(species=int("$taxon_id"))

with open("motifs.jaspar", "w+") as f:
    for motif in motifs:
        f.write(f">{motif.matrix_id} {motif.name}\\n")
        for base in ["A", "C", "G", "T"]:
            f.write(f"{base} [ {' '.join([str(int(x)) for x in motif.counts[base]])} ]\\n")
        f.write("\\n")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "pyjaspar": pyjaspar.__version__
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
