#! /usr/bin/env python3

import pandas as pd
from pathlib import Path
import json
from collections import defaultdict
from itertools import product
import numpy as np
import yaml

counts_design_path = Path("${counts_design}")
assert counts_design_path.exists()

params_path = Path("${summary_params}")
assert params_path.exists()

affinity_ratio_dir = Path("affinity_ratio")
assert affinity_ratio_dir.exists()

affinity_sum_dir = Path("affinity_sum")
assert affinity_sum_dir.exists()

affinities_dir = Path("affinities")
assert affinities_dir.exists()

deseq2_differential_dir = Path("deseq2_differential")
assert deseq2_differential_dir.exists()

normalized_counts_dir = Path("normalized")
assert normalized_counts_dir.exists()

raw_counts_dir = Path("raw_counts")
assert raw_counts_dir.exists()

regression_coefficients_dir = Path("regression_coefficients")
assert regression_coefficients_dir.exists()

tf_ranking_dir = Path("tf_rankings")
assert tf_ranking_dir.exists()

tg_ranking_dir = Path("tg_rankings")
assert tg_ranking_dir.exists()

tpm_dir = Path("tpms")
assert tpm_dir.exists()

df_design = pd.read_csv(counts_design_path)
metadata = {
    "conditions": df_design.groupby("condition").apply(lambda x: x["sample"].tolist()).to_dict()
}

params = yaml.load(open(params_path), yaml.CSafeLoader)
params = {k: v for k, v in params.items() if v is not None}
json.dump(params, open("params.json", "w"), indent=4)

ranking = {}
tfs = {}

pairings = set()

for file in tf_ranking_dir.glob("*.tf_ranking.tsv"):
    assay = file.stem.split(".")[0]

    df_tf = pd.read_csv(file, sep="\\t", index_col=0)
    ranking[assay] = df_tf["dcg"].to_dict()

    df_tg = pd.read_csv(tg_ranking_dir / f"{assay}.tg_ranking.tsv", sep="\\t", index_col=0)

    for tf in df_tf.index:
        if tf not in tfs:
            tfs[tf] = {
                "target_genes": {},
                "differential_expression": {},
                "tg_affinities": {},
                "affinity_ratio": {},
                "affinity_sum": {}
            }
        tfs[tf]["target_genes"][assay] = df_tg[tf].to_dict()

for file in deseq2_differential_dir.glob("*.deseq2.results.tsv"):
    pair_string = file.stem.split(".")[0]
    pairings.add(pair_string)

    df_deseq2 = pd.read_csv(file, sep="\\t", index_col=0)

    for tf in tfs:
        tf_row = df_deseq2.loc[tf]
        tfs[tf]["differential_expression"][pair_string] = {
            "baseMean": tf_row["baseMean"],
            "log2FoldChange": tf_row["log2FoldChange"],
            "lfcSE": tf_row["lfcSE"],
            "pvalue": tf_row["pvalue"],
        }

json.dump(ranking, open("ranking.json", "w"), indent=4)

assays = list(ranking.keys())
metadata["assays"] = assays

conditions = list(metadata["conditions"].keys())

tf_dir = Path("transcription_factors")
tf_dir.mkdir(parents=True, exist_ok=True)

df_tpm = pd.read_csv(tpm_dir / "counts.tpm.tsv", sep="\\t", index_col=0).T
df_counts = pd.read_csv(raw_counts_dir / "counts.counts_filtered.tsv", sep="\\t", index_col=0).T

# Create condition-to-sample mapping for restructuring data
condition_to_samples = metadata["conditions"]

assay_pairing_tf_coefficients = defaultdict(dict)

for pairing, assay in product(pairings, assays):
    df_path = regression_coefficients_dir / f"{pairing}_{assay}_dynamite_regression_coefficients.txt"
    if not df_path.exists():
        continue
    df_coefficients = pd.read_csv(df_path, sep="\\t", index_col=0)
    # Drop rows where all values are NaN
    df_coefficients = df_coefficients.dropna(how="all")

    if len(df_coefficients) > 0:
        assay_pairing_tf_coefficients[pairing][assay] = df_coefficients["value"].to_dict()

    affinity_ratio_path = affinity_ratio_dir / f"{pairing}_{assay}.tsv"
    if affinity_ratio_path.exists():
        df_affinity_ratio = pd.read_csv(affinity_ratio_path, sep="\\t", index_col=0)
        for tf in tfs:
            tfs[tf]["affinity_ratio"][pairing] = {}
            if tf not in df_affinity_ratio.columns:
                continue
            tfs[tf]["affinity_ratio"][pairing][assay] = df_affinity_ratio[tf].to_dict()

    affinity_sum_path = affinity_sum_dir / f"{pairing}_{assay}.tsv"
    if affinity_sum_path.exists():
        df_affinity_sum = pd.read_csv(affinity_sum_path, sep="\\t", index_col=0)
        for tf in tfs:
            tfs[tf]["affinity_sum"][pairing] = {}
            if tf not in df_affinity_sum.columns:
                continue
            tfs[tf]["affinity_sum"][pairing][assay] = df_affinity_sum[tf].to_dict()

json.dump(assay_pairing_tf_coefficients, open("regression_coefficients.json", "w"), indent=4)

for condition, assay in product(conditions, assays):
    df_path = affinities_dir / f"{condition}_{assay}.agg_affinities.tsv"

    if not df_path.exists():
        continue
    df_affinities = pd.read_csv(df_path, sep="\\t", index_col=0)

    for tf in tfs:
        if tf not in df_affinities.columns:
            continue
        if condition not in tfs[tf]["tg_affinities"]:
            tfs[tf]["tg_affinities"][condition] = {}
        tfs[tf]["tg_affinities"][condition][assay] = df_affinities[tf].to_dict()

for tf in tfs:
    # Restructure TPM data: condition -> sample -> value
    tfs[tf]["tpm"] = {}
    for condition, samples in condition_to_samples.items():
        tfs[tf]["tpm"][condition] = {}
        for sample in samples:
            if sample in df_tpm.index:
                tfs[tf]["tpm"][condition][sample] = df_tpm.loc[sample, tf]

    # Restructure counts data: condition -> sample -> value
    tfs[tf]["counts"] = {}
    for condition, samples in condition_to_samples.items():
        tfs[tf]["counts"][condition] = {}
        for sample in samples:
            if sample in df_counts.index:
                tfs[tf]["counts"][condition][sample] = df_counts.loc[sample, tf]

    json.dump(tfs[tf], open(tf_dir / f"{tf}.json", "w"), indent=4)

metadata["transcription_factors"] = list(tfs.keys())

json.dump(metadata, open("metadata.json", "w"), indent=4)
