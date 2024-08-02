import os
import argparse
import pandas as pd

parser = argparse.ArgumentParser()

parser.add_argument('--profile', type=str, required=False, help='nextflow profile', default="apptainer")
parser.add_argument('--outdir', type=str, required=False, help='Path to output directory')
parser.add_argument('--fasta', type=str, required=False, help='Path to the FASTA file')
parser.add_argument('--gtf', type=str, required=False, help='Path to the GTF file')

parser.add_argument('--rna_seq', type=str, required=False, help='RNA-Seq directory')
parser.add_argument('--chip_seq', type=str, required=False, help='ChIP-Seq directory')
parser.add_argument('--atac_seq', type=str, required=False, help='ATAC-Seq directory')

args = parser.parse_args()

profile = args.profile
outdir = args.outdir
fasta = args.fasta
gtf = args.gtf

rna_seq = args.rna_seq
chip_seq = args.chip_seq
atac_seq = args.atac_seq

fasta = "https://raw.githubusercontent.com/nf-core/test-datasets/rnaseq/reference/genome.fa"
gtf = "https://raw.githubusercontent.com/nf-core/test-datasets/rnaseq/reference/genes.gtf"
rna_seq = "/nfs/home/students/l.hafner/inspect/tfactivity/dev/testing/end_to_end/data/rna_seq"
outdir = "/nfs/home/students/l.hafner/inspect/tfactivity/dev/testing/end_to_end/output"


# Start only if output directory does not exist
#if os.path.exists(outdir):
#    raise FileExistsError("Output directory already existing")


def list_files_recursive(directory):
    file_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list



# Run nf-core/rnaseq pipeline
path_rnaseq = os.path.join(outdir, 'nfcore-rnaseq')
path_outdir_rnaseq = os.path.join(path_rnaseq, 'output')
path_samplesheet_rnaseq = os.path.join(path_rnaseq, 'samplesheet_rnaseq.csv')

if not os.path.exists(path_rnaseq):
    os.makedirs(path_rnaseq)

file_paths = list_files_recursive(rna_seq)

samples = {}
for file_path in file_paths:
    condition = file_path.split('/')[-2]
    basename = os.path.basename(file_path)
    
    # Remove .fq.gz and split file name
    sample, rep, read = basename.split('.')[0].split('_')

    sample_name = "_".join([condition, sample, rep])
    
    if sample_name not in samples:
        samples[sample_name] = {'sample': sample_name, 'fastq_1': '', 'fastq_2': '', 'strandedness': 'auto'}
    
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
    -profile {profile}
"""
os.chdir(path_rnaseq)
os.system(rnaseq_run)
