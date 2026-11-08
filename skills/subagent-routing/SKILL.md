---
name: subagent-routing
description: Prepare every delegation or model-discovery call with valid current-session routing.
---

# Subagent routing

Before every delegation/discovery:

- Choose the backend matching the task; use that tool's own schema.
- Use defaults when intended; omit unused route/effort keys entirely.
- For explicit choices, reuse valid current-session authorization or discover exact identifiers. Follow the host's pairing rules; set effort only deliberately and when supported.
- Recheck after session, permissions, backend or contract changes. Rebuild each call; never fill empty placeholders or silently substitute a backend.
- Retain the child identifier and collect completion before claiming success.

For DSH, read [minimal recipes](references/dsh.md) before first use; reuse while valid and reload if lost.
