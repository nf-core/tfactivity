#!/usr/bin/env python3

from pathlib import Path

import pandas as pd
import yaml


TF_COLUMN = "Name.TF"
TARGET_COLUMN = "Name.Target"
SCOPE_COLUMN = "Small-scale.evidence"
SOURCE_COLUMN = "Source.database"
EDGE_OUTPUT_COLUMNS = [
    "tf",
    "target_gene",
    "score",
    "tflink_supported",
    "tflink_match_type",
    "tflink_evidence_scope",
    "tflink_source_count",
    "tflink_sources",
]


def normalize_symbol(value: str) -> str:
    """Normalize gene/TF symbols for deterministic matching.

    TFLink files and ranking outputs can differ in capitalization and may contain
    incidental leading/trailing whitespace. This helper applies the same cleanup
    everywhere before building TF-target keys.
    """
    if value is None:
        return ""
    return str(value).strip().upper()


def tf_symbol_from_motif(tf_name: str) -> str:
    """Extract TF symbol from motif-style names like 'ATF3(MA1988.2)'.

    Ranking columns usually encode the motif ID in parentheses. TFLink files use
    plain TF symbols, so we strip the motif suffix before matching.
    """
    if tf_name is None:
        return ""
    return str(tf_name).split("(")[0].strip()


def validate_required_columns(df: pd.DataFrame) -> None:
    """Validate exact TFLink simple-format column names are present.

    We intentionally require the canonical TFLink headers to keep parsing strict
    and predictable across all species files from TFLink.
    """
    required = [TF_COLUMN, TARGET_COLUMN, SCOPE_COLUMN, SOURCE_COLUMN]
    missing = [column for column in required if column not in df.columns]
    if missing:
        raise ValueError(
            "TFLink input is missing required columns: "
            f"{missing}. Available columns: {list(df.columns)}"
        )


def to_evidence_scope(scopes: set[str]) -> str:
    """Collapse per-edge scope values to one normalized output label.

    Multiple TFLink rows can map to the same TF-target pair. We merge their scope
    labels into one summary value used in `tflink_evidence_scope`.
    """
    normalized = {scope.lower().strip() for scope in scopes if scope and str(scope).strip()}
    if not normalized:
        return "none"
    if normalized == {"small"}:
        return "small"
    if normalized == {"large"}:
        return "large"
    if normalized == {"small", "large"}:
        return "both"
    if normalized == {"all"}:
        return "all"
    return ";".join(sorted(normalized))


def normalize_scope_value(raw_scope: str) -> str:
    """Normalize a single scope value from TFLink `Small-scale.evidence`.

    TFLink `Small-scale.evidence` encodes scope as Yes/No. This function maps
    those values to `small`/`large` and passes through already normalized values.
    """
    if raw_scope is None:
        return "all"
    value = str(raw_scope).strip().lower()
    if not value:
        return "all"

    if value in {"yes", "true", "1"}:
        return "small"
    if value in {"no", "false", "0"}:
        return "large"

    return value


def aggregate_tf_counts(df_edges: pd.DataFrame, group_col: str) -> pd.DataFrame:
    """Aggregate supported and total edge counts by TF-related grouping column."""
    return (
        df_edges.groupby(group_col, sort=False)
        .agg(
            supported=("tflink_supported", "sum"),
            total=("target_gene", "size"),
        )
        .astype({"supported": int, "total": int})
    )


def main() -> None:
    """Annotate ranking outputs with TFLink support without changing scores.

    Inputs:
    - per-assay TF ranking (`*.tf_ranking.tsv`)
    - per-assay TG ranking (`*.tg_ranking.tsv`)
    - TFLink interaction table

    Outputs:
    - TF ranking with TFLink summary columns
    - TG ranking copy for paired report ingestion
    - edge-level TFLink annotation table
    - per-assay summary table
    """
    tf_ranking_path = Path("${tf_ranking}")
    tg_ranking_path = Path("${tg_ranking}")
    tflink_path = Path("${tflink_file}")
    assay = "${meta.id}"

    df_tf = pd.read_csv(tf_ranking_path, sep="\t", index_col=0)
    df_tg = pd.read_csv(tg_ranking_path, sep="\t", index_col=0)
    df_tflink = pd.read_csv(tflink_path, sep="\t")

    validate_required_columns(df_tflink)

    # Group TFLink rows by normalized TF-target keys to aggregate scope/source metadata.
    grouped_pairs = (
        df_tflink.assign(
            tf_symbol=df_tflink[TF_COLUMN].map(normalize_symbol),
            target_symbol=df_tflink[TARGET_COLUMN].map(normalize_symbol),
            scope_value=df_tflink[SCOPE_COLUMN].map(normalize_scope_value),
            source_value=df_tflink[SOURCE_COLUMN].map(
                lambda value: (str(value).strip() if str(value).strip() else "TFLink")
            ),
        )
        .loc[lambda frame: (frame["tf_symbol"] != "") & (frame["target_symbol"] != "")]
        .groupby(["tf_symbol", "target_symbol"], sort=False)
        .agg(
            tflink_evidence_scope=("scope_value", lambda values: to_evidence_scope(set(values))),
            tflink_source_count=("source_value", lambda values: len(set(values))),
            tflink_sources=("source_value", lambda values: ";".join(sorted(set(values)))),
        )
        .reset_index()
    )

    # Build edge-level table in TF-major order.
    df_edges = (
        df_tg.T.stack()
        .rename("score")
        .reset_index()
        .rename(columns={"level_0": "tf", "level_1": "target_gene"})
    )
    df_edges["target_gene"] = df_edges["target_gene"].astype(str)
    df_edges["tf_symbol"] = df_edges["tf"].map(tf_symbol_from_motif).map(normalize_symbol)
    df_edges["target_symbol"] = df_edges["target_gene"].map(normalize_symbol)

    df_edges = df_edges.merge(grouped_pairs, how="left", on=["tf_symbol", "target_symbol"])
    supported_mask = df_edges["tflink_evidence_scope"].notna()
    df_edges["tflink_supported"] = supported_mask
    df_edges["tflink_match_type"] = supported_mask.map({True: "exact_symbol", False: "none"})
    df_edges["tflink_evidence_scope"] = df_edges["tflink_evidence_scope"].fillna("none")
    df_edges["tflink_source_count"] = df_edges["tflink_source_count"].fillna(0).astype(int)
    df_edges["tflink_sources"] = df_edges["tflink_sources"].fillna("")

    # Aggregate per-TF support counts.
    tf_counts_df = aggregate_tf_counts(df_edges, "tf")
    tf_symbol_counts_df = aggregate_tf_counts(df_edges, "tf_symbol")

    # Annotate TF ranking while preserving row order and existing values.
    df_tf_stats = pd.DataFrame(index=df_tf.index)
    tf_index = df_tf_stats.index.to_series()
    df_tf_stats["tf_symbol"] = tf_index.map(tf_symbol_from_motif).map(normalize_symbol)
    df_tf_stats["supported_exact"] = tf_index.map(tf_counts_df["supported"])
    df_tf_stats["total_exact"] = tf_index.map(tf_counts_df["total"])
    df_tf_stats["supported_symbol"] = df_tf_stats["tf_symbol"].map(tf_symbol_counts_df["supported"])
    df_tf_stats["total_symbol"] = df_tf_stats["tf_symbol"].map(tf_symbol_counts_df["total"])
    df_tf_stats["tflink_supported_edges"] = (
        df_tf_stats["supported_exact"].fillna(df_tf_stats["supported_symbol"]).fillna(0).astype(int)
    )
    df_tf_stats["tflink_total_edges"] = (
        df_tf_stats["total_exact"].fillna(df_tf_stats["total_symbol"]).fillna(0).astype(int)
    )
    df_tf_stats["tflink_support_rate"] = (
        df_tf_stats["tflink_supported_edges"] / df_tf_stats["tflink_total_edges"].replace({0: pd.NA})
    ).fillna(0.0)
    df_tf["tflink_supported"] = df_tf_stats["tflink_supported_edges"] > 0
    df_tf["tflink_supported_edges"] = df_tf_stats["tflink_supported_edges"]
    df_tf["tflink_total_edges"] = df_tf_stats["tflink_total_edges"]
    df_tf["tflink_support_rate"] = df_tf_stats["tflink_support_rate"]

    # Per-assay summary.
    summary_total = int(df_edges.shape[0])
    summary_supported = int(df_edges["tflink_supported"].sum())
    summary_rate = (float(summary_supported) / float(summary_total)) if summary_total else 0.0
    df_summary = pd.DataFrame(
        [
            {
                "assay": assay,
                "tflink_total_edges": summary_total,
                "tflink_supported_edges": summary_supported,
                "tflink_support_rate": summary_rate,
            }
        ]
    )

    output_tf = f"{assay}.tflink.tf_ranking.tsv"
    output_tg = f"{assay}.tflink.tg_ranking.tsv"
    output_edges = f"{assay}.tflink_edges.tsv"
    output_summary = f"{assay}.tflink_summary.tsv"

    df_tf.to_csv(output_tf, sep="\t")
    df_tg.to_csv(output_tg, sep="\t")
    df_edges[EDGE_OUTPUT_COLUMNS].to_csv(output_edges, sep="\t", index=False)
    df_summary.to_csv(output_summary, sep="\t", index=False)

    versions = {
        "${task.process}": {
            "pandas": pd.__version__,
            "yaml": yaml.__version__,
        }
    }
    with open("versions.yml", "w", encoding="utf-8") as handle:
        handle.write(yaml.dump(versions))


if __name__ == "__main__":
    main()
