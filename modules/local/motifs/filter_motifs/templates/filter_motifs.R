#!/usr/bin/env Rscript

library(universalmotif)

u.motif <- readRDS("$in_file")
tfs <- readLines("$tfs")

u.motif <- filter_motifs(u.motif, altname = tfs)

saveRDS(u.motif, "$out_file")

writeLines(
    c(
        '"${task.process}":',
        paste('    r-base:', strsplit(version[['version.string']], ' ')[[1]][3]),
        paste('    bioconductor-universalmotif:', packageVersion("universalmotif"))
    ),
'versions.yml')
