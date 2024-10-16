#!/usr/bin/env Rscript

library(universalmotif)

in_file <- "$in_file"

in_type <- "$in_type"
allowed_in_types <- c("cisbp", "homer", "jaspar", "meme", "transfac", "uniprobe", "universal")

if (!(in_type %in% allowed_in_types)) {
    stop("Input type '", in_type, "' not supported. Supported types are: ", paste(allowed_in_types, collapse=", "))
}

out_type <- "$out_type"
allowed_out_types <- c("homer", "jaspar", "meme", "transfac", "universal")

if (!(out_type %in% allowed_out_types)) {
    stop("Output type '", out_type, "' not supported. Supported types are: ", paste(allowed_out_types, collapse=", "))
}

u.motif <- switch(in_type,
    cisbp = read_cisbp,
    homer = read_homer,
    jaspar = read_jaspar,
    meme = read_meme,
    transfac = read_transfac,
    uniprobe = read_uniprobe,
    universal = readRDS
)(in_file)

switch(out_type,
    homer = write_homer,
    jaspar = write_jaspar,
    meme = write_meme,
    transfac = write_transfac,
    universal = saveRDS
)(u.motif, "$out_file")

writeLines(
    c(
        '"${task.process}":',
        paste('    r-base:', strsplit(version[['version.string']], ' ')[[1]][3]),
        paste('    bioconductor-universalmotif:', packageVersion("universalmotif"))
    ),
'versions.yml')
