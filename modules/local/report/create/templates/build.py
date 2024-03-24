#!/usr/bin/env python3

from jinja2 import Environment, PackageLoader, select_autoescape
import os
import shutil
import json
import pandas as pd

module_app = os.path.abspath("$moduleDir/app")
app_dir = "app"
out_dir = "report"

# Copy app_dir to current directory
shutil.copytree(module_app, os.path.join(os.getcwd(), app_dir), dirs_exist_ok=True)

params = json.loads(r'$params_string')

env = Environment(
    loader=PackageLoader(app_dir),
    autoescape=select_autoescape()
)

tf = env.get_template("tf.html")
tg = env.get_template("tg.html")
snp = env.get_template("snp.html")
styles = env.get_template("styles.css")

rankings = {
    key: pd.read_csv(path, sep="\t", index_col=0, usecols=[0,1], names=["TF", key], header=0) 
    for key, path in {
        path[:-len(".ranking.tsv")]: path 
        for path in r"$assay_ranking".split(" ")
    }.items()
}

df_ranking = pd.concat(rankings.values(), axis=1)

# Remove all NaN values
ranking = {
    tf: {assay: rank for assay, rank in ranks.items() if not pd.isna(rank)}
    for tf, ranks in df_ranking.to_dict(orient="index").items()
}

assays = df_ranking.columns
sorted(assays, reverse=True)

os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "index.html"), "w") as f:
    f.write(tf.render(ranking=ranking, assays=assays))

with open(os.path.join(out_dir, "target_genes.html"), "w") as f:
    f.write(tg.render())

with open(os.path.join(out_dir, "snps.html"), "w") as f:
    f.write(snp.render())

with open(os.path.join(out_dir, "styles.css"), "w") as f:
    f.write(styles.render())

with open(os.path.join(out_dir, "params.json"), "w") as f:
    json.dump(params, f, indent=4)