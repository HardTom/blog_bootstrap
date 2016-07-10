#!/bin/bash
forever start -a -l forever.log -o out.log -e err.log -w app.js   #输出日志和错误

