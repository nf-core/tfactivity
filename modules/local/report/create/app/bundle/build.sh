#!/bin/bash

esbuild --bundle --minify lib.js --format=iife --global-name=lib --outfile=../dependencies/lib.js
