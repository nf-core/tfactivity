#!/usr/bin/env python3

from jinja2 import Environment, PackageLoader, select_autoescape
import os
import shutil

module_app = os.path.abspath("$moduleDir/app")
app_dir = "app"
out_dir = "report"

# Copy app_dir to current directory
shutil.copytree(module_app, os.path.join(os.getcwd(), app_dir), dirs_exist_ok=True)

print(os.listdir("."))

print("Hello from build.py")
print("ModuleDir: $moduleDir")
print("AppDir: " + app_dir)

env = Environment(
    loader=PackageLoader(app_dir),
    autoescape=select_autoescape()
)

text = "Hello, World!"

tf = env.get_template("tf.html")
tg = env.get_template("tg.html")
snp = env.get_template("snp.html")

os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "index.html"), "w") as f:
    f.write(tf.render())

with open(os.path.join(out_dir, "target_genes.html"), "w") as f:
    f.write(tg.render())

with open(os.path.join(out_dir, "snps.html"), "w") as f:
    f.write(snp.render())
