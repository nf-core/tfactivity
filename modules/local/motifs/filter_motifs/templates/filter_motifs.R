#!/usr/bin/env Rscript

library(universalmotif)

# Read motifs and convert altname to uppercase
u.motif <- readRDS("$in_file")
u.motif <- lapply(u.motif, function(m) {m@altname <- toupper(m@altname); m})

# Read TFs and convert to uppercase
tfs <- toupper(readLines("$tfs"))

# Filter motifs based on altname
u.motif <- filter_motifs(u.motif, altname = tfs)

# Add ID to symbol to make TFs unique
u.motif <- lapply(u.motif, function(m) {m@altname <- toupper(sprintf("%s(%s)", m@altname, m@name)); m})

saveRDS(u.motif, "$out_file")

writeLines(
    c(
        '"${task.process}":',
        paste('    r-base:', strsplit(version[['version.string']], ' ')[[1]][3]),
        paste('    bioconductor-universalmotif:', packageVersion("universalmotif"))
    ),
'versions.yml')
