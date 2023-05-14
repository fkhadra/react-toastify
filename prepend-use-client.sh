#!/usr/bin/env bash

# TODO yeah maybe let's make something more robust and futur proof
files=("react-toastify.js" "react-toastify.esm.mjs" "inject-style.js" "inject-style.esm.mjs")

for f in ${files[*]}; do
 echo -e "'use client';\n$(cat ./dist/${f})" > ./dist/${f}
done
