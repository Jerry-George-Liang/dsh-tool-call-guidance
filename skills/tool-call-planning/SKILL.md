---
name: tool-call-planning
description: Validate every call and carry the rules through later steps; includes DSH task-query recipes.
---

# Tool call planning

Before **every call**, silently:

1. Match current intent to the exact available tool and operation.
2. Build required fields plus intended optional values. Check types/enums, exclusions and dependencies by key presence. Omit unused keys; preserve intended false/zero; never pad with empty/null placeholders.
3. Verify the final outgoing name/object and current-scope identifiers. Resolve missing values or signature conflicts before calling.
4. Recheck later calls. Reuse facts only while session/permissions, tool/version, scope and relevant state remain valid; refresh changed facts. Rebuild arguments for current intent.
5. Base dependent actions on results. Diagnose before retrying; failed reads leave state unknown; asynchronous starts need completion.

Reload these rules if unavailable. DSH: load `subagent-routing` before delegation/discovery; for task filters load `tool-call-planning` and read its [query recipes](references/dsh-team-tasks.md). Reuse recipes while valid.
