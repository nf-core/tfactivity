#! /usr/bin/env python3

import pandas as pd
from pathlib import Path
import json
from collections import defaultdict
from itertools import product
import numpy as np
import yaml
from gtfparse import read_gtf

# Constants
OVERVIEW_TEMPLATE = {"dcg": {}, "regression_coefficients": {}, "differential_expression": {}, "tpm": {}}
TF_TEMPLATE = {
    "target_genes": {},
    "differential_expression": {},
    "tg_affinities": {},
    "affinity_ratio": {},
    "affinity_sum": {},
    "tpm": {},
    "counts": {},
    "fimo_binding_sites": {},
}

def remove_motif_id(tf):
    """Remove everything in parentheses"""
    return tf.split("(")[0]

def get_motif_id(tf):
    """Get the motif ID from the TF name"""
    return tf.split("(")[1].split(")")[0]

def load_paths_and_validate():
    """Load and validate all required paths."""
    paths = {
        'counts_design': Path("${counts_design}"),
        'summary_params': Path("${summary_params}"),
        'gtf': Path("${gtf}"),
        'affinity_ratio_dir': Path("affinity_ratio"),
        'affinity_sum_dir': Path("affinity_sum"),
        'affinities_dir': Path("affinities"),
        'deseq2_differential_dir': Path("deseq2_differential"),
        'normalized_counts_dir': Path("normalized"),
        'raw_counts_dir': Path("raw_counts"),
        'regression_coefficients_dir': Path("regression_coefficients"),
        'tf_ranking_dir': Path("tf_rankings"),
        'tg_ranking_dir': Path("tg_rankings"),
        'tpm_dir': Path("tpms"),
        'fimo_binding_sites_dir': Path("fimo_binding_sites"),
        'candidate_regions_dir': Path("candidate_regions"),
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

        df_tf = pd.read_csv(file, sep="\\t", index_col=0)
        df_tg = pd.read_csv(paths['tg_ranking_dir'] / f"{assay}.tg_ranking.tsv", sep="\\t", index_col=0)

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

        df_deseq2 = pd.read_csv(file, sep="\\t", index_col=0)

        for tf in tfs:
            tf_no_motif_id = remove_motif_id(tf)
            if tf_no_motif_id not in df_deseq2.index:
                continue

            tf_row = df_deseq2.loc[tf_no_motif_id]
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

        df_coefficients = pd.read_csv(df_path, sep="\\t", index_col=0)
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
            df_affinity_ratio = pd.read_csv(affinity_ratio_path, sep="\\t", index_col=0)
            for tf in tfs:
                if pairing not in tfs[tf]["affinity_ratio"]:
                    tfs[tf]["affinity_ratio"][pairing] = {}
                if tf in df_affinity_ratio.columns:
                    tfs[tf]["affinity_ratio"][pairing][assay] = df_affinity_ratio[tf].to_dict()

        # Process affinity sum
        affinity_sum_path = paths['affinity_sum_dir'] / f"{pairing}_{assay}.tsv"
        if affinity_sum_path.exists():
            df_affinity_sum = pd.read_csv(affinity_sum_path, sep="\\t", index_col=0)
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

        df_affinities = pd.read_csv(df_path, sep="\\t", index_col=0)

        for tf in tfs:
            if tf not in df_affinities.columns:
                continue
            if condition not in tfs[tf]["tg_affinities"]:
                tfs[tf]["tg_affinities"][condition] = {}
            tfs[tf]["tg_affinities"][condition][assay] = df_affinities[tf].to_dict()

def filter_target_genes_top_n(tfs, assays, top_n=200):
    """Keep the top N genes per TF by average score across assays.

    - Computes mean across available assays for each gene (per TF).
    - Keeps the top_n genes by mean score and prunes per-assay maps accordingly.
    """
    for tf, tf_data in tfs.items():
        target_genes = tf_data.get("target_genes", {})
        if not target_genes:
            continue

        gene_to_values = defaultdict(list)
        for assay in assays:
            assay_map = target_genes.get(assay, {})
            for gene, value in assay_map.items():
                try:
                    gene_to_values[gene].append(float(value))
                except Exception:
                    continue

        if not gene_to_values:
            # Nothing to keep
            tf_data["target_genes"] = {assay: {} for assay in target_genes.keys()}
            continue

        # Compute means and select top N
        gene_means = {gene: float(np.mean(values)) for gene, values in gene_to_values.items() if values}
        # Sort genes by mean descending and take top_n
        top_genes = [g for g, _ in sorted(gene_means.items(), key=lambda kv: kv[1], reverse=True)[: int(top_n)]]
        keep_genes = set(top_genes)

        # Prune per-assay maps
        for assay, assay_map in list(target_genes.items()):
            tf_data["target_genes"][assay] = {gene: score for gene, score in assay_map.items() if gene in keep_genes}

def process_expression_data(df_tpm, df_counts, overview, tfs, condition_to_samples):
    """Process TPM and counts data efficiently."""
    # Process TPM for overview (only TFs that exist in overview)
    for tf in overview:
        tf_no_motif_id = remove_motif_id(tf)
        if tf_no_motif_id in df_tpm.columns:
            overview[tf]["tpm"] = {}
            for condition, samples in condition_to_samples.items():
                overview[tf]["tpm"][condition] = {}
                for sample in samples:
                    if sample in df_tpm.index:
                        overview[tf]["tpm"][condition][sample] = df_tpm.loc[sample, tf_no_motif_id]

    # Process expression data for individual TFs
    for tf in tfs:
        # TPM data
        tf_no_motif_id = remove_motif_id(tf)
        if tf_no_motif_id in df_tpm.columns:
            tfs[tf]["tpm"] = {}
            for condition, samples in condition_to_samples.items():
                tfs[tf]["tpm"][condition] = {}
                for sample in samples:
                    if sample in df_tpm.index:
                        tfs[tf]["tpm"][condition][sample] = df_tpm.loc[sample, tf_no_motif_id]

        # Counts data
        if tf_no_motif_id in df_counts.columns:
            tfs[tf]["counts"] = {}
            for condition, samples in condition_to_samples.items():
                tfs[tf]["counts"][condition] = {}
                for sample in samples:
                    if sample in df_counts.index:
                        tfs[tf]["counts"][condition][sample] = df_counts.loc[sample, tf_no_motif_id]

def process_fimo_binding_sites(paths, tfs, conditions, assays):
    """Process FIMO binding sites data."""
    for condition, assay in product(conditions, assays):
        df_path = paths['fimo_binding_sites_dir'] / f"{condition}_{assay}.tsv"
        if not df_path.exists():
            continue
        df_fimo = pd.read_csv(df_path, sep="\\t", index_col=None)
        for tf in tfs:
            df_tf = df_fimo[df_fimo["motif_alt_id"] == tf].copy()
            df_tf = df_tf.drop(columns=["motif_alt_id", "motif_id"])
            if df_tf.empty:
                continue
            if condition not in tfs[tf]["fimo_binding_sites"]:
                tfs[tf]["fimo_binding_sites"][condition] = {}
            tfs[tf]["fimo_binding_sites"][condition][assay] = df_tf.to_dict(orient="records")

def build_gene_locations(paths):
    """Parse GTF and build a mapping of gene symbols to genomic locations.

    Keeps original `gene_name` case as keys and writes only one entry per gene_name.
    Returns: dict[gene_name] -> {chrom, start, end, strand, gene_id}
    """
    df_gtf = read_gtf(str(paths['gtf']), result_type='pandas')
    required_cols = ["gene_name", "gene_id", "seqname", "start", "end", "strand"]
    missing_cols = [col for col in required_cols + ["feature"] if col not in df_gtf.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns in GTF: {', '.join(missing_cols)}")

    df_genes = df_gtf[df_gtf["feature"] == "gene"][required_cols].dropna(subset=["gene_name"])\
        .drop_duplicates(subset=["gene_name"], keep="first")

    gene_locations = {
        str(row["gene_name"]): {
            "chrom": row["seqname"],
            "start": int(row["start"]),
            "end": int(row["end"]),
            "strand": row["strand"],
            "gene_id": row["gene_id"],
        }
        for _, row in df_genes.iterrows()
    }
    return gene_locations

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

def process_candidate_regions(paths, conditions, assays):
    """Read candidate regions BED files into condition→assay→sample hierarchy."""
    candidate_regions = {}

    for condition, assay in product(conditions, assays):
        sample_to_regions = {}
        for bed_path in paths['candidate_regions_dir'].glob(f"{condition}_{assay}_*.bed"):
            stem = bed_path.stem
            prefix = f"{condition}_{assay}_"
            # Remove exact '<condition>_<assay>_' prefix, even if those contain underscores
            sample = stem[len(prefix):] if stem.startswith(prefix) else stem

            chrom_to_intervals = {}
            with open(bed_path, "r") as fh:
                for line in fh:
                    if not line or line.startswith("#"):
                        continue
                    fields = line.rstrip("\\n").split("\\t")
                    if len(fields) < 3:
                        continue
                    chrom = fields[0]
                    try:
                        start = int(fields[1])
                        end = int(fields[2])
                    except ValueError:
                        continue
                    if chrom not in chrom_to_intervals:
                        chrom_to_intervals[chrom] = []
                    chrom_to_intervals[chrom].append([start, end])

            sample_to_regions[sample] = chrom_to_intervals

        if sample_to_regions:
            candidate_regions.setdefault(condition, {})[assay] = sample_to_regions

    return candidate_regions

def write_output_files(overview, tfs, metadata, params, candidate_regions):
    """Write all output files."""
    # Write main output files
    json.dump(params, open("params.json", "w"), indent=4)
    json.dump(overview, open("overview.json", "w"), indent=4)
    json.dump(metadata, open("metadata.json", "w"), indent=4)
    json.dump(candidate_regions, open("candidate_regions.json", "w"), indent=4)

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
    process_fimo_binding_sites(paths, tfs, conditions, assays)

    # Build and write gene locations mapping (gene symbol -> genomic coordinates)
    gene_locations = build_gene_locations(paths)
    json.dump(gene_locations, open("gene_locations.json", "w"), indent=4)

    # Load expression data once and process
    df_tpm = pd.read_csv(paths['tpm_dir'] / "counts.tpm.tsv", sep="\\t", index_col=0).T
    df_counts = pd.read_csv(paths['raw_counts_dir'] / "counts.counts_filtered.tsv", sep="\\t", index_col=0).T

    process_expression_data(df_tpm, df_counts, overview, tfs, condition_to_samples)

    # Keep only top 200 target genes per TF by average score across assays
    filter_target_genes_top_n(tfs, assays, top_n=200)

    # Merge data and finalize
    merge_overview_data(overview, tfs)

    # Clean up empty data structures
    clean_empty_data(overview, tfs)

    metadata["transcription_factors"] = list(tfs.keys())

    # Candidate regions
    candidate_regions = process_candidate_regions(paths, conditions, assays)

    # Write outputs
    write_output_files(overview, tfs, metadata, params, candidate_regions)

if __name__ == "__main__":
    main()
