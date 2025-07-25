#!/usr/bin/env python3

import argparse
import os
import argparse
import string
import pandas as pd
from typing import List, Optional
from collections.abc import Sequence
from pathlib import Path

def parse_args():
    parser = argparse.ArgumentParser()

    parser.add_argument('--fasta', type=Path, required=False, help='Path to the FASTA file')
    parser.add_argument('--gtf', type=Path, required=False, help='Path to the GTF file')
    parser.add_argument('--genome', type=Path, required=False, help='genome name/version')
    parser.add_argument('--motifs', type=Path, required=False, help='Path to JASPAR motif file')
    parser.add_argument('--taxon_id', type=str, required=False, help='JASPAR taxon ID for motif download')
    parser.add_argument('--outdir', type=Path, required=False, help='Path to output directory', default='output')

    # nf-core/chipseq and nf-core/atacseq are mutually exclusive
    parser.add_argument('--rna_seq', type=Path, required=True, help='RNA-Seq directory')
    atac_seq_chip_seq_group = parser.add_mutually_exclusive_group(required=True)
    atac_seq_chip_seq_group.add_argument('--chip_seq', type=Path, help='ChIP-Seq directory', default=None)
    atac_seq_chip_seq_group.add_argument('--atac_seq', type=Path, help='ATAC-Seq directory', default=None)

    parser.add_argument('--profile', type=str, required=False, help='nextflow profile', default="apptainer")
    parser.add_argument('--apptainer_cache', type=str, required=False, help='Path to the apptainer cache directory')
    parser.add_argument('--process_executor', type=str, required=False, help='Executor for the nextflow pipelines', default='local')
    parser.add_argument('--process_queue', type=str, required=False, help='scheduler queue')

    parser.add_argument('--chipseq_read_length', type=int, help='Read length used to calculate MACS3 genome size for peak calling', default=50, required=False)
    parser.add_argument('--atacseq_read_length', type=int, help='Read length used to calculate MACS3 genome size for peak calling', default=50, required=False)

    # Peaks to keep for the samplesheet peaks of nf-core/tfactivity (directly convert into list via typing)
    parser.add_argument('--keep_peaks', type=lambda x: x.split(','), help='ChIP-Seq assays to keep for the nf-core/tfactivity pipeline run.', default='H3K27ac,H3K4me1,H3K4me3,RNAPolII', required=False)

    parser.add_argument('--rna_seq_args', type=str, required=False, help='Additional arguments for nf-core/rnaseq pipeline.')
    parser.add_argument('--chip_seq_args', type=str, required=False, help='Additional arguments for nf-core/chipseq pipeline.')
    parser.add_argument('--atac_seq_args', type=str, required=False, help='Additional arguments for nf-core/atacseq pipeline.')
    parser.add_argument('--tfactivity_args', type=str, required=False, help='Additional arguments for nf-core/tfactivity pipeline.')

    args = parser.parse_args()

    if args.taxon_id is None and (args.genome is None or args.motifs is None):
        parser.error("If --taxon_id is not specified, both --genome and --motifs must be provided.")

    return args


def list_files(
    directory: Path,
    prefix: Optional[str] = None,
    suffix: Optional[str] = None,
    recursive: Optional[bool] = False,
    ) -> List[str]:
    """
    List files in the specified directory, optionally including subdirectories.

    Parameters:
        directory (str): The root directory to start the search.
        prefix (str, optional): Filter files that start with this prefix.
        suffix (str, optional): Filter files that end with this suffix.
        recursive (bool, optional): If True, search subdirectories as well.
                                    If False, search only the specified directory.
                                    Default is False.

    Returns:
        List[str]: List of file paths matching the criteria.
    """

    file_list = []

    if recursive:
        for root, _, files in os.walk(directory):
            for file in files:
                if (prefix is None or file.startswith(prefix)) and (suffix is None or file.endswith(suffix)):
                    file_list.append(os.path.join(root, file))
    else:
        for file in os.listdir(directory):
            full_path = os.path.join(directory, file)
            if os.path.isfile(full_path):
                if (prefix is None or file.startswith(prefix)) and (suffix is None or file.endswith(suffix)):
                    file_list.append(full_path)

    return file_list


def run_nfcore_rnaseq(
    input_dir: Path,
    output_dir: Path,
    gtf: Path,
    fasta: Path,
    profile: Optional[str],
    process_executor: Optional[str],
    process_queue: Optional[str],
    args: Optional[str] = '',
    ) -> Path:
    """
    Run the nf-core/rnaseq pipeline.

    Parameters:
        input_dir (Path): Path to the input directory containing the RNA-Seq data.
        output_dir (Path): Path to the base output directory where end_to_end results will be stored.
        gtf (Path): Path to the genome annotation file in GTF format.
        fasta (Path): Path to the genome reference file in FASTA format.
        profile (str): Nextflow execution profile (e.g. docker, apptainer, slurm).
        process_executor (str): Executor to be used for running individual processes (e.g. local, slurm).
        process_queue (str): Name of the job queue (if applicable).
        args (str, optional): Additional arguments for the nf-core/rnaseq pipeline.

    Returns:
        Path: Path to the directory containing the nf-core/rnaseq pipeline output.
    """

    # Create output directory structure
    execution_dir = os.path.join(output_dir, 'nfcore-rnaseq')
    pipeline_output_dir = os.path.join(execution_dir, 'output')
    path_samplesheet = os.path.join(execution_dir, 'samplesheet.csv')

    # Convert parameters into Nextflow arguments
    profile_arg = f'-profile {profile}' if profile else ''
    process_executor_arg = f'-process.executor {process_executor}' if process_executor else ''
    process_queue_arg = f'-process.queue {process_queue}' if process_queue else ''

    if not os.path.exists(execution_dir):
        os.makedirs(execution_dir)

    file_paths = list_files(input_dir, recursive=True)

    samples = {}
    for file_path in file_paths:
        condition = file_path.split('/')[-2]
        basename = os.path.basename(file_path)

        # Remove .fq.gz and split file name
        sample, rep, read = basename.split('.')[0].split('_')

        sample_name = "_".join([condition, sample, rep])

        if sample_name not in samples:
            samples[sample_name] = {'sample': sample_name,
                                    'fastq_1': '',
                                    'fastq_2': '',
                                    'strandedness': 'auto'}

        if read == 'R1':
            samples[sample_name]['fastq_1'] = file_path
        elif read == 'R2':
            samples[sample_name]['fastq_2'] = file_path

    samplesheet = pd.DataFrame.from_dict(samples, orient='index')
    samplesheet.to_csv(path_samplesheet, index=False)

    pipeline_run_cmd = f"""
    nextflow run \
        nf-core/rnaseq \
        -r 3.19.0 \
        --input {path_samplesheet} \
        --outdir {pipeline_output_dir} \
        --gtf {gtf} \
        --fasta {fasta} \
        --igenomes_ignore \
        --genome null \
        {profile_arg} \
        {process_executor_arg} \
        {process_queue_arg} \
        -resume \
        --skip_deseq2_qc true \
        --skip_multiqc true \
        --skip_preseq true \
        --skip_biotype_qc true \
        --skip_dupradar true \
        --skip_bigwig true \
        --skip_rseqc true \
        {args or ''}
    """
    print(f"Running command: {pipeline_run_cmd}")
    os.chdir(execution_dir)
    #os.system(pipeline_run_cmd)
    return Path(pipeline_output_dir)


def run_nfcore_chipseq(
    input_dir: Path,
    output_dir: Path,
    gtf: Path,
    fasta: Path,
    profile: Optional[str],
    process_executor: Optional[str],
    process_queue: Optional[str],
    read_length: int,
    args: Optional[str] = '',
    ) -> Path:
    """
    Run the nf-core/chipseq pipeline.

    Parameters:
        input_dir (Path): Path to the input directory containing the ChIP-Seq data.
        output_dir (Path): Path to the base output directory where end_to_end results will be stored.
        gtf (Path): Path to the genome annotation file in GTF format.
        fasta (Path): Path to the genome reference file in FASTA format.
        profile (str): Nextflow execution profile (e.g. docker, apptainer, slurm).
        process_executor (str): Executor to be used for running individual processes (e.g. local, slurm).
        process_queue (str): Name of the job queue (if applicable).
        read_length (int): Read length used to calculate MACS3 genome size for peak calling.
        args (str, optional): Additional arguments for the nf-core/chipseq pipeline.

    Returns:
        Path: Path to the directory containing the nf-core/chipseq pipeline output.
    """

    # Create output directory structure
    execution_dir = os.path.join(output_dir, 'nfcore-chipseq')
    pipeline_output_dir = os.path.join(execution_dir, 'output')
    path_samplesheet = os.path.join(execution_dir, 'samplesheet.csv')

    # Convert parameters into Nextflow arguments
    profile_arg = f'-profile {profile}' if profile else ''
    process_executor_arg = f'-process.executor {process_executor}' if process_executor else ''
    process_queue_arg = f'-process.queue {process_queue}' if process_queue else ''

    if not os.path.exists(execution_dir):
        os.makedirs(execution_dir)

    file_paths = list_files(input_dir, recursive=True)

    samples = {}
    for file_path in file_paths:
        condition = file_path.split('/')[-3]
        antibody = file_path.split('/')[-2]
        basename = os.path.basename(file_path)

        # Remove .fq.gz and split file name
        sample, rep, read = basename.split('.')[0].split('_')

        condition_antibody_sample = "_".join([condition, antibody, sample])

        sample_rep = '_'.join([condition_antibody_sample, rep])

        # Strip 'REP' from replicate
        if sample_rep not in samples:
            samples[sample_rep] = {'sample': condition_antibody_sample,
                                'fastq_1': '',
                                'fastq_2': '',
                                'replicate': rep.strip(string.ascii_letters),
                                'antibody': antibody,
                                'control': f'{condition}_CONTROL_{sample}',
                                'control_replicate': rep.strip(string.ascii_letters)}

        if read == 'R1':
            samples[sample_rep]['fastq_1'] = file_path
        elif read == 'R2':
            samples[sample_rep]['fastq_2'] = file_path

    samplesheet = pd.DataFrame.from_dict(samples, orient='index')

    # Remove control files that do not exist
    samplesheet['control'] = samplesheet['control'].apply(lambda x: x if x in samplesheet['sample'].values else '')

    # Remove antibody, control and control_replicate column from dataframe
    samplesheet.loc[samplesheet['sample'].str.contains('CONTROL'), ['antibody', 'control', 'control_replicate']] = ''
    samplesheet.to_csv(path_samplesheet, index=False)

    # TODO: Change revision to correct stable version after next nf-core/chipseq release
    pipeline_run_cmd = f"""
    nextflow run \
        nf-core/chipseq \
        -r 16a7d15e29 \
        --input {path_samplesheet} \
        --outdir {pipeline_output_dir} \
        --gtf {gtf} \
        --fasta {fasta} \
        --read_length {read_length} \
        --save_align_intermeds \
        {profile_arg} \
        {process_executor_arg} \
        {process_queue_arg} \
        -resume \
        --skip_preseq true \
        --skip_picard_metrics true \
        --skip_plot_profile true \
        --skip_plot_fingerprint true \
        --skip_spp true \
        --skip_multiqc true \
        --skip_igv true \
        {args or ''}
    """
    print(f"Running command: {pipeline_run_cmd}")
    os.chdir(execution_dir)
    #os.system(pipeline_run_cmd)
    return Path(pipeline_output_dir)


def run_nfcore_atacseq(
    input_dir: Path,
    output_dir: Path,
    gtf: Path,
    fasta: Path,
    profile: Optional[str],
    process_executor: Optional[str],
    process_queue: Optional[str],
    read_length: int,
    args: Optional[str] = ''
    ) -> None:
    """
    Run the nf-core/atacseq pipeline.

    Parameters:
        input_dir (Path): Path to the input directory containing the ATAC-Seq data.
        output_dir (Path): Path to the base output directory where end_to_end results will be stored.
        gtf (Path): Path to the genome annotation file in GTF format.
        fasta (Path): Path to the genome reference file in FASTA format.
        profile (str): Nextflow execution profile (e.g. docker, apptainer, slurm).
        process_executor (str): Executor to be used for running individual processes (e.g. local, slurm).
        process_queue (str): Name of the job queue (if applicable).
        read_length (int): Read length used to calculate MACS3 genome size for peak calling.
        args (str, optional): Additional arguments for the nf-core/atacseq pipeline.

    Returns:
        Path: Path to the directory containing the nf-core/chipseq pipeline output.
    """

    # Create output directory structure
    execution_dir = os.path.join(output_dir, 'nfcore-atacseq')
    pipeline_output_dir = os.path.join(execution_dir, 'output')
    path_samplesheet = os.path.join(execution_dir, 'samplesheet.csv')

    # Convert parameters into Nextflow arguments
    profile_arg = f'-profile {profile}' if profile else ''
    process_executor_arg = f'-process.executor {process_executor}' if process_executor else ''
    process_queue_arg = f'-process.queue {process_queue}' if process_queue else ''

    if not os.path.exists(execution_dir):
        os.makedirs(execution_dir)

    file_paths = list_files(input_dir, recursive=True)

    samples = {}
    for file_path in file_paths:
        condition = file_path.split('/')[-2]
        basename = os.path.basename(file_path)

        # Remove .fq.gz and split file name
        sample, rep, read = basename.split('.')[0].split('_')

        sample_name = "_".join([condition, sample, rep])
        rep = rep.replace('REP', '')

        if sample_name not in samples:
            samples[sample_name] = {
                'sample': sample_name,
                'fastq_1': '',
                'fastq_2': '',
                'replicate': rep,
                'control': f'{condition}_CONTROL_REP{rep}',
                'control_replicate': rep.strip(string.ascii_letters),
            }

        if read == 'R1':
            samples[sample_name]['fastq_1'] = file_path
        elif read == 'R2':
            samples[sample_name]['fastq_2'] = file_path

    samplesheet = pd.DataFrame.from_dict(samples, orient='index')
    samplesheet['control'] = samplesheet['control'].apply(lambda x: x if x in samplesheet['sample'].values else '')
    samplesheet.loc[samplesheet['sample'].str.contains('CONTROL'), ['control', 'control_replicate']] = ''
    samplesheet.to_csv(path_samplesheet, index=False)

    pipeline_run_cmd = f"""
    nextflow run \
        nf-core/atacseq \
        -r 1a1dbe52ff \
        --input {path_samplesheet} \
        --outdir {pipeline_output_dir} \
        --gtf {gtf} \
        --fasta {fasta} \
        --read_length {read_length} \
        {profile_arg} \
        {process_executor_arg} \
        {process_queue_arg} \
        -resume \
        {args or ''}
    """
    print(f"Running command: {pipeline_run_cmd}")
    os.chdir(execution_dir)
    #os.system(pipeline_run_cmd)
    return Path(pipeline_output_dir)


def run_nfcore_tfactivity(
    output_dir: Path,
    path_outdir_rnaseq: Path,
    path_outdir_chipseq: Path,
    path_outdir_atacseq: Path,
    motifs: Path,
    genome: Path,
    gtf: Path,
    fasta: Path,
    keep_peaks: Sequence[str],
    profile: Optional[str],
    process_executor: Optional[str],
    process_queue: Optional[str],
    args: Optional[str] = ''
    ) -> None:
    """
    Run the nf-core/tfactivity pipeline.

    Parameters:
        output_dir (Path): Path to the base output directory where end_to_end results will be stored.
        path_outdir_rnaseq (Path): Path to the output directory of the nf-core/rnaseq pipeline.
        path_outdir_chipseq (Path): Path to the output directory of the nf-core/chipseq pipeline.
        path_outdir_atacseq (Path): Path to the output directory of the nf-core/atacseq pipeline.
        motifs (Path): Path to the JASPAR motif file.
        genome (Path): Genome name/version for the JASPAR motifs.
        gtf (Path): Path to the genome annotation file in GTF format.
        fasta (Path): Path to the genome reference file in FASTA format.
        profile (str): Nextflow execution profile (e.g. docker, apptainer, slurm).
        process_executor (str): Executor to be used for running individual processes (e.g. local, slurm).
        process_queue (str): Name of the job queue (if applicable).
        args (str, optional): Additional arguments for the nf-core/tfactivity pipeline.

    Returns:
        None
    """

    # Create output directory structure
    execution_dir = os.path.join(output_dir, 'nfcore-tfactivity')
    pipeline_output_dir = os.path.join(execution_dir, 'output')
    path_samplesheet_peaks = os.path.join(execution_dir, 'samplesheet_peaks.csv')
    path_samplesheet_bams = os.path.join(execution_dir, 'samplesheet_bams.csv')

    path_design_rna = os.path.join(execution_dir, 'design_rna.csv')
    path_counts_rna = os.path.join(execution_dir, 'counts_rna.csv')

    # Convert parameters into Nextflow arguments
    profile_arg = f'-profile {profile}' if profile else ''
    process_executor_arg = f'-process.executor {process_executor}' if process_executor else ''
    process_queue_arg = f'-process.queue {process_queue}' if process_queue else ''

    if not os.path.exists(execution_dir):
        os.makedirs(execution_dir)

    # Create counts_rna and design_rna files from nf-core/rnaseq output
    create_counts_design_rna(
        path_outdir_rnaseq=path_outdir_rnaseq,
        execution_dir=execution_dir,
        path_design_rna=path_design_rna,
        path_counts_rna=path_counts_rna,
    )

    # Use results of nf-core/chipseq or nf-core/atacseq to create samplesheets for peaks and bams
    if path_outdir_chipseq is not None and path_outdir_atacseq is None:
        create_samplesheet_peaks_bams_from_chipseq(
            path_outdir_chipseq=path_outdir_chipseq,
            path_samplesheet_peaks=path_samplesheet_peaks,
            path_samplesheet_bams=path_samplesheet_bams,
            keep_peaks=keep_peaks,
        )
    elif path_outdir_atacseq is not None and path_outdir_chipseq is None:
        create_samplesheet_peaks_from_atacseq(
            path_outdir_atacseq=path_outdir_atacseq,
            path_samplesheet_peaks=path_samplesheet_peaks,
        )
        path_samplesheet_bams = None
    else:
        raise ValueError("Either --chip_seq or --atac_seq must be provided.")

    chipseq_atacseq_bams_arg = f'--input_bams {path_samplesheet_bams}' if path_samplesheet_bams else '--skip_chromhmm true --skip_rose true'

    pipeline_run_cmd = f"""
    nextflow run \
        nf-core/tfactivity \
        -r dev \
        --input {path_samplesheet_peaks} \
        {chipseq_atacseq_bams_arg} \
        --counts {path_counts_rna} \
        --counts_design {path_design_rna} \
        --motifs {motifs} \
        --genome {genome} \
        --fasta {fasta} \
        --gtf {gtf} \
        --outdir {pipeline_output_dir} \
        {profile_arg} \
        {process_executor_arg} \
        {process_queue_arg} \
        -resume \
        {args or ''}
    """
    print(f"Running command: {pipeline_run_cmd}")
    os.chdir(execution_dir)
    #os.system(pipeline_run_cmd)


def create_counts_design_rna(
    path_outdir_rnaseq: Path,
    execution_dir: str,
    path_design_rna: str,
    path_counts_rna: str,
    ) -> None:
    # Convert rna counts to csv
    counts_rna_tsv = pd.read_csv(os.path.join(path_outdir_rnaseq, 'star_salmon', 'salmon.merged.gene_counts.tsv'), sep='\t')
    counts_rna_tsv['gene_id'].to_csv(path_counts_rna, header=False, index=False)

    counts_design = {}
    for sample in counts_rna_tsv.drop(columns=['gene_id', 'gene_name']).columns:
        condition = sample.split('_')[0]
        path_sample_counts = os.path.join(execution_dir, f'{sample}_counts.txt')

        counts_rna_tsv[sample].to_csv(path_sample_counts, index=False, header=False)
        counts_design[sample] = {
            'sample': sample,
            'condition': condition,
            'counts_file': path_sample_counts,
        }

    pd.DataFrame.from_dict(counts_design, orient='index').to_csv(path_design_rna, index=False)


def create_samplesheet_peaks_bams_from_chipseq(
    path_outdir_chipseq: Path,
    path_samplesheet_peaks: str,
    path_samplesheet_bams: str,
    keep_peaks: Sequence[str] = ('H3K27ac', 'H3K4me1', 'H3K4me3', 'RNAPolII'),
    ) -> None:
    # Create samplesheet peaks
    file_paths_peaks = list_files(os.path.join(path_outdir_chipseq, 'bwa', 'merged_library', 'macs3', 'broad_peak'), suffix='.broadPeak')

    samples = {}
    for file_path in file_paths_peaks:
        basename = os.path.basename(file_path)
        condition, antibody, sample, rep, _ = basename.split('_')

        sample_id = '_'.join([condition, antibody, sample, rep])

        if sample_id not in samples:
            # TODO: Set 'footprinting' for ChIP-Seq but not for ATAC-Seq and DNase-Seq
            samples[sample_id] = {
                'sample': sample_id,
                'condition': condition,
                'assay': antibody,
                'peak_file': file_path,
            }
        else:
            raise ValueError('Duplicate sample_id detected!')

    samplesheet_peaks = pd.DataFrame.from_dict(samples, orient='index').sort_values(by='sample')
    # Use only important peaks as input to the pipeline
    samplesheet_peaks = samplesheet_peaks[samplesheet_peaks["assay"].isin(keep_peaks)]
    samplesheet_peaks.to_csv(path_samplesheet_peaks, index=False)

    # Create samplesheet bams
    file_paths_bams = list_files(os.path.join(path_outdir_chipseq, 'bwa', 'merged_library'), suffix='.mLb.clN.sorted.bam')

    samples = {}
    controls = {}
    for file_path in file_paths_bams:
        basename = os.path.basename(file_path)
        condition, antibody, sample, rep = basename.split('.')[0].split('_')

        sample_id = '_'.join([condition, antibody, sample, rep])

        if antibody != 'CONTROL' and sample_id not in samples:
            samples[sample_id] = {
                'sample': sample_id,
                'condition': condition,
                'assay': antibody,
                'signal': file_path,
                'merge_key': f'{condition}_{sample}_{rep}',
            }
        elif antibody == 'CONTROL' and sample_id not in controls:
            controls[sample_id] = {
                'merge_key': f'{condition}_{sample}_{rep}',
                'control': file_path,
            }
        else:
            raise ValueError('Duplicated sample_id detected!')

    samplesheet_bam = pd.DataFrame.from_dict(samples, orient='index')
    controls = pd.DataFrame.from_dict(controls, orient='index')

    samplesheet_bam = samplesheet_bam.merge(controls, on='merge_key', how='inner').drop(columns='merge_key').sort_values(by='sample')
    samplesheet_bam.to_csv(path_samplesheet_bams, index=False)


def create_samplesheet_peaks_from_atacseq(
    path_outdir_atacseq: Path,
    path_samplesheet_peaks: str,
    ) -> None:

    # Create samplesheet peaks
    file_paths_peaks = list_files(os.path.join(path_outdir_atacseq, 'bwa', 'merged_library', 'macs3', 'broad_peak'), suffix='.broadPeak')

    samples = {}
    for file_path in file_paths_peaks:
        basename = os.path.basename(file_path)
        condition, sample, rep, _ = basename.split('.')[0].split('_')

        sample_id = '_'.join([condition, sample, rep])

        if sample_id not in samples:
            samples[sample_id] = {
                'sample': sample_id,
                'condition': condition,
                'assay': 'atacseq',
                'peak_file': file_path,
            }
        else:
            raise ValueError('Duplicate sample_id detected!')

    samplesheet_peaks = pd.DataFrame.from_dict(samples, orient='index').sort_values(by='sample')
    samplesheet_peaks.to_csv(path_samplesheet_peaks, index=False)


def main():
    args = parse_args()

    # Set environment variables
    os.environ["NXF_APPTAINER_CACHEDIR"] = args.apptainer_cache or ""

    # Create global end_to_end output directory if not exisiting
    if not os.path.exists(args.outdir):
        os.makedirs(args.outdir)

    #print("Running nf-core/rnaseq pipeline...")
    path_outdir_rnaseq = run_nfcore_rnaseq(
        input_dir=args.rna_seq,
        output_dir=args.outdir,
        gtf=args.gtf,
        fasta=args.fasta,
        profile=args.profile,
        process_executor=args.process_executor,
        process_queue=args.process_queue,
        args=args.rna_seq_args,
    )
    path_outdir_chipseq = None
    path_outdir_atacseq = None
    if args.chip_seq is not None:
        #print("Running nf-core/chipseq pipeline...")
        path_outdir_chipseq = run_nfcore_chipseq(
            input_dir=args.chip_seq,
            output_dir=args.outdir,
            gtf=args.gtf,
            fasta=args.fasta,
            profile=args.profile,
            process_executor=args.process_executor,
            process_queue=args.process_queue,
            read_length=args.chipseq_read_length,
            args=args.chip_seq_args,
        )
    elif args.atac_seq is not None:
        #print("Running nf-core/atacseq pipeline...")
        path_outdir_atacseq = run_nfcore_atacseq(
            input_dir=args.atac_seq,
            output_dir=args.outdir,
            gtf=args.gtf,
            fasta=args.fasta,
            profile=args.profile,
            process_executor=args.process_executor,
            process_queue=args.process_queue,
            read_length=args.atacseq_read_length,
            args=args.atac_seq_args,
        )
    else:
        raise ValueError("Either --chip_seq or --atac_seq must be provided.")

    #print("Running nf-core/tfactivity pipeline...")
    run_nfcore_tfactivity(
        output_dir=args.outdir,
        path_outdir_rnaseq=path_outdir_rnaseq,
        path_outdir_chipseq=path_outdir_chipseq,
        path_outdir_atacseq=path_outdir_atacseq,
        motifs=args.motifs,
        genome=args.genome,
        gtf=args.gtf,
        fasta=args.fasta,
        keep_peaks=args.keep_peaks,
        profile=args.profile,
        process_executor=args.process_executor,
        process_queue=args.process_queue,
        args=args.tfactivity_args,
    )

if __name__ == "__main__":
    main()
