#!/usr/bin/env bash
TASKS_CSV="tasks.csv"
EPICS_CSV="epics.csv"

gawk -F, '
# ---------- pass 1: epics.csv ----------
FNR==NR {
  if (NR==1) next                  # skip header
  epic = $1
  prio = $3 + 0
  name = $4
  priority[epic] = prio
  names[epic] = name
  next
}

# ---------- pass 2: tasks.csv ----------
FNR==1 { next }                    # skip header in tasks.csv too

{
  task = $4
  epic = $3                        # <-- change this to the epic column in tasks.csv
  tasks[epic, ++tcount[epic]] = task
}

END {
  # Sort epics by numeric priority (ascending)
  n = asorti(priority, epics, "@val_num_asc")

  for (i = 1; i <= n; i++) {
    epic = epics[i]

    # Epic header
    printf "\n== [%d] %s ==\n", priority[epic], names[epic]

    # Tasks under this epic
    if (tcount[epic] == 0) {
      print "  (no tasks)"
      continue
    }

    for (j = 1; j <= tcount[epic]; j++) {
      printf "  - %s\n", tasks[epic, j]
    }
  }
}
' $EPICS_CSV $TASKS_CSV
