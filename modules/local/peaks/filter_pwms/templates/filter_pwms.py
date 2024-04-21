#!/usr/bin/env python3

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

with open("$genes", "r") as f:
    legal_genes = set([gene.rstrip("\\n") for gene in f.readlines()])

legal = True

with open("$pwms", "r") as f_input, open("pwms.txt", "w") as f_output:
    for line in f_input:
        if legal and not line.startswith(">"):
            f_output.write(line)
        else:
            splitted = line.split("\\t")
            group = splitted[1]
            genes = group.split("::")
            legal = any(gene in legal_genes for gene in genes)

            if legal:
                f_output.write(line)

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version()
    }
}

with open("versions.yml", "w") as f:
    f.write(format_yaml_like(versions))
