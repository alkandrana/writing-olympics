#! /usr/bin/env bash
#session_id,date,start,stop,scene_id,words

CSV="master-writing-log.csv"
awk -F, 'NR>1 {
  printf "{\n"
  printf "\tstart: new Date(\047%sT%s\047),\n", $2, $3
  printf "\tstop: new Date(\047%sT%s\047),\n", $2, $4
  printf "\twords: %d,\n", $6
  printf "\tsceneId: \047%s\047\n", $5
  printf "},\n"
}' $CSV
