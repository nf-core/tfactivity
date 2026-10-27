#! /usr/bin/env python

import platform
import yaml

from BCBio import GFF

gtf_path = "${gtf}"

id_symbol_map = {}

with open(gtf_path, 'r') as gtf_file:
    gff_record = GFF.parse(gtf_file)
    for record in gff_record:
        for feature in record.features:
            for subfeature in feature.sub_features:
                if "gene_id" in subfeature.qualifiers and "gene_name" in subfeature.qualifiers:
                    id_symbol_map[subfeature.qualifiers["gene_id"][0]] = subfeature.qualifiers["gene_name"][0]

with open("${prefix}.txt", 'w') as id_symbol_map_file:
    id_symbol_map_file.write("gene_id\\tgene_name\\n")
    for gene_id, symbol in id_symbol_map.items():
        id_symbol_map_file.write(f"{gene_id}\\t{symbol}\\n")

# Create version file
versions = {
    "${task.process}" : {
        "python": platform.python_version(),
        "bcbio": "${VERSION}",
    }
}

with open("versions.yml", "w") as f:
    yaml.dump(versions, f)
