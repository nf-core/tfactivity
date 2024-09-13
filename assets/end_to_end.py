import os
import argparse
import string
import pandas as pd

parser = argparse.ArgumentParser()

parser.add_argument('--profile', type=str, required=False, help='nextflow profile', default="apptainer")
parser.add_argument('--outdir', type=str, required=False, help='Path to output directory')
parser.add_argument('--fasta', type=str, required=False, help='Path to the FASTA file')
parser.add_argument('--gtf', type=str, required=False, help='Path to the GTF file')
parser.add_argument('--apptainer_cache', type=str, required=False, help='Path to the apptainer cache directory')
parser.add_argument('--process_executor', type=str, required=False, help='Executor for the nextflow pipelines', default='local')

parser.add_argument('--rna_seq', type=str, required=False, help='RNA-Seq directory')
parser.add_argument('--chip_seq', type=str, required=False, help='ChIP-Seq directory')
parser.add_argument('--atac_seq', type=str, required=False, help='ATAC-Seq directory')

args = parser.parse_args()

profile = args.profile
outdir = args.outdir
fasta = args.fasta
gtf = args.gtf
apptainer_cache = args.apptainer_cache
process_executor = args.process_executor

rna_seq = args.rna_seq
chip_seq = args.chip_seq
atac_seq = args.atac_seq

# TODO: Remove hard coded parameters
fasta = "https://raw.githubusercontent.com/nf-core/test-datasets/rnaseq/reference/genome.fa"
gtf = "https://raw.githubusercontent.com/nf-core/test-datasets/rnaseq/reference/genes.gtf"
rna_seq = "/nfs/home/students/l.hafner/inspect/tfactivity/dev/testing/end_to_end/data/rna_seq"
chip_seq = "/nfs/home/students/l.hafner/inspect/tfactivity/dev/testing/end_to_end/data/chip_seq"
outdir = "/nfs/home/students/l.hafner/inspect/tfactivity/dev/testing/end_to_end/output"
apptainer_cache = "/nfs/scratch/apptainer_cache"
process_executor = 'local'

os.environ["NXF_APPTAINER_CACHEDIR"] = apptainer_cache


# Create output directory if not exisiting
if not os.path.exists(outdir):
    os.makedirs(outdir)


def list_files_recursive(directory):
    file_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list


# Run nf-core/rnaseq pipeline
path_nfcore_rnaseq = os.path.join(outdir, 'nfcore-rnaseq')
path_outdir_rnaseq = os.path.join(path_nfcore_rnaseq, 'output')
path_samplesheet_rnaseq = os.path.join(path_nfcore_rnaseq, 'samplesheet_rnaseq.csv')

if not os.path.exists(path_nfcore_rnaseq):
    os.makedirs(path_nfcore_rnaseq)

file_paths = list_files_recursive(rna_seq)

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

df = pd.DataFrame.from_dict(samples, orient='index').to_csv(path_samplesheet_rnaseq, index=False)

rnaseq_run = f"""
nextflow run \
    nf-core/rnaseq \
    --input {path_samplesheet_rnaseq} \
    --outdir {path_outdir_rnaseq} \
    --gtf {gtf} \
    --fasta {fasta} \
    --igenomes_ignore \
    --genome null \
    -profile {profile} \
    -process.executor {process_executor} \
    -resume \
    --skip_deseq2_qc true
"""
os.chdir(path_nfcore_rnaseq)
os.system(rnaseq_run)


# Run nfcore/chipseq pipeline
path_nfcore_chipseq = os.path.join(outdir, 'nfcore-chipseq')
path_outdir_chipseq = os.path.join(path_nfcore_chipseq, 'output')
path_samplesheet_chipseq = os.path.join(path_nfcore_chipseq, 'samplesheet_chipseq.csv')

if not os.path.exists(path_nfcore_chipseq):
    os.makedirs(path_nfcore_chipseq)

file_paths = list_files_recursive(chip_seq)

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

chipseq_samplesheet = pd.DataFrame.from_dict(samples, orient='index')

# Remove control files that do not exist
chipseq_samplesheet['control'] = chipseq_samplesheet['control'].apply(lambda x: x if x in chipseq_samplesheet['sample'].values else '')

# Remove antibody, control and control_replicate column from dataframe
chipseq_samplesheet.loc[chipseq_samplesheet['sample'].str.contains('CONTROL'), ['antibody', 'control', 'control_replicate']] = ''
chipseq_samplesheet.to_csv(path_samplesheet_chipseq, index=False)

# Runs on revision dev as the pipeline has not had an release for some time
# TODO change parameter read_length
# TODO change parameter skip_preseq
# TODO disable processes not needed for downstream pipelines
chipseq_run = f"""
nextflow run \
    nf-core/chipseq \
    -r dev \
    --input {path_samplesheet_chipseq} \
    --outdir {path_outdir_chipseq} \
    --gtf {gtf} \
    --fasta {fasta} \
    --read_length 50 \
    -profile {profile} \
    -process.executor {process_executor} \
    -resume \
    --skip_preseq true
"""

os.chdir(path_nfcore_chipseq)
os.system(chipseq_run)
