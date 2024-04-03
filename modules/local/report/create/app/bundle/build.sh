#!/bin/bash

esbuild --bundle lib.js --format=iife --global-name=lib --outfile=../dependencies/lib.js