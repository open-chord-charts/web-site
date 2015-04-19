#!/bin/bash

test -d public/assets || mkdir -p public/assets
cp node_modules/basscss/css/* public/assets
