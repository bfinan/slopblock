#!/bin/bash
# https://www.youtube.com/watch?v=LIQ_PcH3YuU

git -c http.sslVerify=false pull
git add .
git status
git commit -m "new commit"
git -c http.sslVerify=false push 


