#!/usr/bin/env python3

import argparse

parser = argparse.ArgumentParser(description="Filter PWMs based on genes.")
parser.add_argument("--input", type=str, help="Path to input PWMs")
parser.add_argument("--genes", type=str, help="Path to genes")
parser.add_argument("--output", type=str, help="Path to output PWMs")

args = parser.parse_args()

with open(args.genes, "r") as f:
    legal_genes = set([gene.rstrip("\n") for gene in f.readlines()])

f_input = open(args.input, "r")
f_output = open(args.output, "w")

legal = True

for line in f_input:
    if legal and not line.startswith(">"):
        f_output.write(line)
    else:
        splitted = line.split("\t")
        group = splitted[1]
        genes = group.split("::")
        legal = any(gene in legal_genes for gene in genes)

        if legal:
            f_output.write(line)

f_input.close()
f_output.close()
