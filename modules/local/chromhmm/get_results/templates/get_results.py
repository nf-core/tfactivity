#!/usr/bin/env python3
# coding: utf-8

import pandas as pd
import numpy as np

marks = "${marks.join(' ')}".split()

# Read emissions file for the provided marks
emissions = pd.read_csv("$emissions", sep = "\\t")[["State (Emission order)"] + marks].rename(columns={"State (Emission order)": "State"})


# Read input bed file and remove unecessary columns
bed = pd.read_csv("$bed",
                  sep="\\t",
                  skiprows=1,
                  names=["chr", "start", "end", "state", "score", "strand", "start_1", "end_1", "rgb"]
                 )


# Keep state if any of the marks is enriched > threshold for this state
states = emissions[np.any([emissions[mark] >= float("$threshold") for mark in marks], axis=0)]["State"].tolist()


# Subset bed file for selected states
bed = bed[np.isin(bed["state"], states)].drop(columns=["state"])
bed["name"] = bed["chr"] + ":" + bed["start"].astype(str) + "-" + bed["end"].astype(str)

bed = bed[["chr", "start", "end", "name", "score", "strand"]]

# Write output
bed.to_csv("$output_file", index=False, sep="\\t", header=False)
