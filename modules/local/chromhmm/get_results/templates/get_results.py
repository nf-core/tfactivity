#!/usr/bin/env python3
# coding: utf-8

import pandas as pd
import numpy as np

marks = "$marks".split(" ")

# Read emissions file for the provided marks
emissions = pd.read_csv("$emissions", sep = "\t")[["State (Emission order)"] + marks].rename(columns={"State (Emission order)": "State"})


# Read input bed file and remove unecessary columns
bed = pd.read_csv("$bed",
                  sep="\t",
                  skiprows=1,
                  names=["chr", "start", "end", "state", "score", "strand", "start_1", "end_1", "rgb"]
                 ).drop(columns=["strand", "score", "start_1", "end_1", "rgb"])


# Keep state if any of the marks is enriched > threshold for this state
states = emissions[np.any([emissions[mark] >= $threshold for mark in marks], axis=0)]["State"].tolist()


# Subset bed file for selected states
out_bed = bed[np.isin(bed["state"], states)].drop(columns=["state"])

# Write output
out_bed.to_csv("$output_file", index=False, sep="\t", header=False)
