#! /usr/bin/env python3

import pandas as pd
from pathlib import Path
import json
from collections import defaultdict
from itertools import product
import numpy as np
import yaml

# Constants
OVERVIEW_TEMPLATE = {"dcg": {}, "regression_coefficients": {}, "differential_expression": {}, "tpm": {}}
TF_TEMPLATE = {
    "target_genes": {},
    "differential_expression": {},
    "tg_affinities": {},
    "affinity_ratio": {},
    "affinity_sum": {},
    "tpm": {},
    "counts": {}
}

def load_paths_and_validate():
    """Load and validate all required paths."""
    paths = {
        'counts_design': Path("${counts_design}"),
        'summary_params': Path("${summary_params}"),
        'affinity_ratio_dir': Path("affinity_ratio"),
        'affinity_sum_dir': Path("affinity_sum"),
        'affinities_dir': Path("affinities"),
        'deseq2_differential_dir': Path("deseq2_differential"),
        'normalized_counts_dir': Path("normalized"),
        'raw_counts_dir': Path("raw_counts"),
        'regression_coefficients_dir': Path("regression_coefficients"),
        'tf_ranking_dir': Path("tf_rankings"),
        'tg_ranking_dir': Path("tg_rankings"),
        'tpm_dir': Path("tpms")
    }

    # Validate all paths exist
    for name, path in paths.items():
        assert path.exists(), f"Required path does not exist: {path}"

    return paths

def init_tf_overview(tf, overview):
    """Initialize a TF in the overview structure if it doesn't exist."""
    if tf not in overview:
        overview[tf] = OVERVIEW_TEMPLATE.copy()
        for key in overview[tf]:
            overview[tf][key] = {}

def init_tf_data(tf, tfs):
    """Initialize a TF in the tfs structure if it doesn't exist."""
    if tf not in tfs:
        tfs[tf] = TF_TEMPLATE.copy()
        for key in tfs[tf]:
            tfs[tf][key] = {}

def process_ranking_data(paths, overview, tfs):
    """Process TF ranking and target gene data."""
    for file in paths['tf_ranking_dir'].glob("*.tf_ranking.tsv"):
        assay = file.stem.split(".")[0]

        df_tf = pd.read_csv(file, sep="\t", index_col=0)
        df_tg = pd.read_csv(paths['tg_ranking_dir'] / f"{assay}.tg_ranking.tsv", sep="\t", index_col=0)

        # Process all TFs from this assay
        for tf, dcg_score in df_tf["dcg"].items():
            # Initialize structures
            init_tf_overview(tf, overview)
            init_tf_data(tf, tfs)

            # Store DCG scores
            overview[tf]["dcg"][assay] = dcg_score

            # Store target genes
            tfs[tf]["target_genes"][assay] = df_tg[tf].to_dict()

def process_differential_expression(paths, overview, tfs):
    """Process differential expression data."""
    pairings = set()

    for file in paths['deseq2_differential_dir'].glob("*.deseq2.results.tsv"):
        pair_string = file.stem.split(".")[0]
        pairings.add(pair_string)

        df_deseq2 = pd.read_csv(file, sep="\t", index_col=0)

        for tf in tfs:
            if tf not in df_deseq2.index:
                continue

            tf_row = df_deseq2.loc[tf]
            diff_expr_data = {
                "baseMean": tf_row["baseMean"],
                "log2FoldChange": tf_row["log2FoldChange"],
                "lfcSE": tf_row["lfcSE"],
                "pvalue": tf_row["pvalue"],
            }

            # Store in both structures
            tfs[tf]["differential_expression"][pair_string] = diff_expr_data
            init_tf_overview(tf, overview)
            overview[tf]["differential_expression"][pair_string] = diff_expr_data

    return pairings

def process_regression_coefficients(paths, overview, pairings, assays):
    """Process regression coefficients data."""
    for pairing, assay in product(pairings, assays):
        df_path = paths['regression_coefficients_dir'] / f"{pairing}_{assay}_dynamite_regression_coefficients.txt"
        if not df_path.exists():
            continue

        df_coefficients = pd.read_csv(df_path, sep="\t", index_col=0)
        df_coefficients = df_coefficients.dropna(how="all")

        if len(df_coefficients) > 0:
            for tf, coefficient in df_coefficients["value"].items():
                init_tf_overview(tf, overview)
                if pairing not in overview[tf]["regression_coefficients"]:
                    overview[tf]["regression_coefficients"][pairing] = {}
                overview[tf]["regression_coefficients"][pairing][assay] = coefficient

def process_affinity_data(paths, tfs, pairings, assays):
    """Process affinity ratio and sum data."""
    for pairing, assay in product(pairings, assays):
        # Process affinity ratio
        affinity_ratio_path = paths['affinity_ratio_dir'] / f"{pairing}_{assay}.tsv"
        if affinity_ratio_path.exists():
            df_affinity_ratio = pd.read_csv(affinity_ratio_path, sep="\t", index_col=0)
            for tf in tfs:
                if pairing not in tfs[tf]["affinity_ratio"]:
                    tfs[tf]["affinity_ratio"][pairing] = {}
                if tf in df_affinity_ratio.columns:
                    tfs[tf]["affinity_ratio"][pairing][assay] = df_affinity_ratio[tf].to_dict()

        # Process affinity sum
        affinity_sum_path = paths['affinity_sum_dir'] / f"{pairing}_{assay}.tsv"
        if affinity_sum_path.exists():
            df_affinity_sum = pd.read_csv(affinity_sum_path, sep="\t", index_col=0)
            for tf in tfs:
                if pairing not in tfs[tf]["affinity_sum"]:
                    tfs[tf]["affinity_sum"][pairing] = {}
                if tf in df_affinity_sum.columns:
                    tfs[tf]["affinity_sum"][pairing][assay] = df_affinity_sum[tf].to_dict()

def process_tg_affinities(paths, tfs, conditions, assays):
    """Process target gene affinities data."""
    for condition, assay in product(conditions, assays):
        df_path = paths['affinities_dir'] / f"{condition}_{assay}.agg_affinities.tsv"
        if not df_path.exists():
            continue

        df_affinities = pd.read_csv(df_path, sep="\t", index_col=0)

        for tf in tfs:
            if tf not in df_affinities.columns:
                continue
            if condition not in tfs[tf]["tg_affinities"]:
                tfs[tf]["tg_affinities"][condition] = {}
            tfs[tf]["tg_affinities"][condition][assay] = df_affinities[tf].to_dict()

def process_expression_data(df_tpm, df_counts, overview, tfs, condition_to_samples):
    """Process TPM and counts data efficiently."""
    # Process TPM for overview (only TFs that exist in overview)
    for tf in overview:
        if tf in df_tpm.columns:
            overview[tf]["tpm"] = {}
            for condition, samples in condition_to_samples.items():
                overview[tf]["tpm"][condition] = {}
                for sample in samples:
                    if sample in df_tpm.index:
                        overview[tf]["tpm"][condition][sample] = df_tpm.loc[sample, tf]

    # Process expression data for individual TFs
    for tf in tfs:
        # TPM data
        if tf in df_tpm.columns:
            tfs[tf]["tpm"] = {}
            for condition, samples in condition_to_samples.items():
                tfs[tf]["tpm"][condition] = {}
                for sample in samples:
                    if sample in df_tpm.index:
                        tfs[tf]["tpm"][condition][sample] = df_tpm.loc[sample, tf]

        # Counts data
        if tf in df_counts.columns:
            tfs[tf]["counts"] = {}
            for condition, samples in condition_to_samples.items():
                tfs[tf]["counts"][condition] = {}
                for sample in samples:
                    if sample in df_counts.index:
                        tfs[tf]["counts"][condition][sample] = df_counts.loc[sample, tf]

def clean_params_data(params):
    """Remove null/None values from params dictionary."""
    keys_to_remove = []
    for key, value in params.items():
        if value is None:
            keys_to_remove.append(key)
        elif isinstance(value, dict):
            # Recursively clean nested dictionaries
            clean_params_data(value)
            # Remove if dictionary becomes empty after cleaning
            if not value:
                keys_to_remove.append(key)

    # Remove keys that have null values or are empty after cleaning
    for key in keys_to_remove:
        del params[key]

def clean_empty_data(overview, tfs):
    """Remove empty data structures from overview and tfs."""
    # Clean overview
    for tf in overview:
        # Remove empty differential_expression
        if not overview[tf]["differential_expression"]:
            del overview[tf]["differential_expression"]
        # Remove empty regression_coefficients
        if not overview[tf]["regression_coefficients"]:
            del overview[tf]["regression_coefficients"]
        # Remove empty TPM (though this should be rare)
        if not overview[tf]["tpm"]:
            del overview[tf]["tpm"]

    # Clean individual TF structures
    for tf in tfs:
        # Remove empty differential_expression
        if not tfs[tf]["differential_expression"]:
            del tfs[tf]["differential_expression"]
        # Remove empty affinity data
        if not tfs[tf]["affinity_ratio"]:
            del tfs[tf]["affinity_ratio"]
        if not tfs[tf]["affinity_sum"]:
            del tfs[tf]["affinity_sum"]
        # Remove empty tg_affinities
        if not tfs[tf]["tg_affinities"]:
            del tfs[tf]["tg_affinities"]
        # Remove empty target_genes
        if not tfs[tf]["target_genes"]:
            del tfs[tf]["target_genes"]

def merge_overview_data(overview, tfs):
    """Merge overview data into individual TF structures."""
    for tf in tfs:
        if tf in overview:
            # Only add keys that have data
            if "dcg" in overview[tf] and overview[tf]["dcg"]:
                tfs[tf]["dcg"] = overview[tf]["dcg"]
            if "regression_coefficients" in overview[tf] and overview[tf]["regression_coefficients"]:
                tfs[tf]["regression_coefficients"] = overview[tf]["regression_coefficients"]
            if "differential_expression" in overview[tf] and overview[tf]["differential_expression"]:
                tfs[tf]["differential_expression"] = overview[tf]["differential_expression"]
            # Use overview TPM if available, otherwise keep individual processing
            if "tpm" in overview[tf] and overview[tf]["tpm"]:
                tfs[tf]["tpm"] = overview[tf]["tpm"]

def write_output_files(overview, tfs, metadata, params):
    """Write all output files."""
    # Write main output files
    json.dump(params, open("params.json", "w"), indent=4)
    json.dump(overview, open("overview.json", "w"), indent=4)
    json.dump(metadata, open("metadata.json", "w"), indent=4)

    # Write individual TF files
    tf_dir = Path("transcription_factors")
    tf_dir.mkdir(parents=True, exist_ok=True)

    for tf in tfs:
        json.dump(tfs[tf], open(tf_dir / f"{tf}.json", "w"), indent=4)

def main():
    """Main processing function."""
    # Initialize data structures
    overview = {}
    tfs = {}

    # Load and validate paths
    paths = load_paths_and_validate()

    # Load design and params
    df_design = pd.read_csv(paths['counts_design'])
    metadata = {
        "conditions": df_design.groupby("condition").apply(lambda x: x["sample"].tolist()).to_dict(),
        "methods_description": json.load(open('${methods_description_meta}'))
    }
    condition_to_samples = metadata["conditions"]
    conditions = list(condition_to_samples.keys())

    params = yaml.load(open(paths['summary_params']), yaml.CSafeLoader)

    # Clean params data to remove null values
    clean_params_data(params)

    # Process core data
    process_ranking_data(paths, overview, tfs)
    pairings = process_differential_expression(paths, overview, tfs)

    # Get assays from overview
    assays = list(set([assay for tf_data in overview.values() for assay in tf_data["dcg"].keys()]))
    metadata["assays"] = assays

    # Process remaining data types
    process_regression_coefficients(paths, overview, pairings, assays)
    process_affinity_data(paths, tfs, pairings, assays)
    process_tg_affinities(paths, tfs, conditions, assays)

    # Load expression data once and process
    df_tpm = pd.read_csv(paths['tpm_dir'] / "counts.tpm.tsv", sep="\t", index_col=0).T
    df_counts = pd.read_csv(paths['raw_counts_dir'] / "counts.counts_filtered.tsv", sep="\t", index_col=0).T

    process_expression_data(df_tpm, df_counts, overview, tfs, condition_to_samples)

        # Merge data and finalize
    merge_overview_data(overview, tfs)

    # Clean up empty data structures
    clean_empty_data(overview, tfs)

    metadata["transcription_factors"] = list(tfs.keys())

    # Write outputs
    write_output_files(overview, tfs, metadata, params)

if __name__ == "__main__":
    main()
