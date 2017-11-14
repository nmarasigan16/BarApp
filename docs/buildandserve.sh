#!/bin/bash
make html;
cd build/html;
python -m http.server
