#!/usr/bin/env bash
CSV="tasks.csv"

add_task() {
  read -p "Description: " desc
  read -p "Epic: " epic
  id=$(($(tail -n +2 "$CSV" | wc -l) + 1))
  echo "$id,open,$epic,$desc,$(date +%F)," >>"$CSV"
  echo "Added task #$id"
}

list_tasks() {
  status="$1"
  if [ -z "$status" ]; then
    awk -F, 'NR==1 || $2 != "done"' "$CSV"
  else
    awk -F, -v s="$status" 'NR==1 || $2 == s' "$CSV"
  fi
}

print_epic() {
  epic_id="$1"
  awk -F, -v id="$epic_id" '                              
    BEGIN {
      green="\033[32m"
      yellow="\033[33m"
      reset="\033[0m"   
    }
    $3 == id {
      if ($2=="done") { 
        printf "%s%s%s\n", green, $0, reset
      } else if ($2=="in-progress") {
        printf "%s%s%s\n", yellow, $0, reset
      } else { print }
    }
  ' "$CSV"
}

mark_done() {
  id="$1"
  tmp=$(mktemp)
  awk -F, -v id="$id" -v today="$(date +%F)" '
        BEGIN { OFS="," }
        NR==1 { print; next }
        $1==id { $2="done"; $5=today; print; next }
        { print }
    ' "$CSV" >"$tmp"
  mv "$tmp" "$CSV"
  echo "Task #$id marked as done."
}

start_task() {
  id="$1"
  tmp=$(mktemp)
  awk -F, -v id="$id" -v today="$(date +%F)" '
    BEGIN { OFS="," }
    NR==1 { print; next }
    $1==id { $2="in-progress"; $5=today; print; next }
    { print }
  ' "$CSV" >"$tmp"
  mv "$tmp" "$CSV"
  echo "Task #$id marked as in progress."
}

case "$1" in
add) add_task "$2" ;;
list) list_tasks "$2" ;;
done) mark_done "$2" ;;
start) start_task "$2" ;;
epic) print_epic "$2" ;;
*)
  echo "Usage: $0 { add|list|start|done|epic }"
  ;;
esac
