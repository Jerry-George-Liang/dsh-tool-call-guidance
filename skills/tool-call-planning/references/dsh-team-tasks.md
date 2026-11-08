# DSH task queries

Choose the current intent before each `team_task_list` call:

| Intent | Arguments |
|---|---|
| All tasks | `{}` |
| Lead's tasks | `{"owner":"lead"}` |
| Unowned tasks | `{"unowned":true}` |
| Owned tasks | `{"unowned":false}` |

`owner` and `unowned` exclude each other by key presence, even when `unowned` is false. When intent changes, choose a new row; do not merge the previous query's keys.

Add independent filters only when requested. Example: `{"owner":"lead","status":"pending","ready":false,"cursor":0}`. Preserve intentional false/zero and omit unused filters. Reuse these rules while the current tool contract remains valid; recheck when it changes. A failed query leaves state unknown.
