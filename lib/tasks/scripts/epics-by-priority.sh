#!/usr/bin/env bash
CSV="epics.csv"

awk -F, '
  NR==1 {
    next 
  } {
    epics[$4] = $3 
  } END {
    for (epic in epics) {
      printf "%d | %s\n", epics[epic], epic 
    } 
  }
' $CSV | sort -n
