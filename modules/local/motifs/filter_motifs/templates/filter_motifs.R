#!/usr/bin/env Rscript

library(universalmotif)

u.motif <- readRDS("$in_file")
tfs <- readLines("$tfs")

u.motif <- filter_motifs(u.motif, altname = tfs)

saveRDS(u.motif, "$out_file")