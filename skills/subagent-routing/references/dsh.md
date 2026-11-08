# DSH routing recipes

| Intent | Arguments |
|---|---|
| Ordinary child, defaults | `{"prompt":"Return OK.","description":"检查默认委派"}` |
| Discover providers | `{}` |
| Discover a provider's models | `{"provider":"<discovered-id>"}` |
| Check a route/efforts | `{"provider":"<discovered-id>","model":"<exact-id>"}` |

Discovery rows use `list_subagent_models`. Angle-bracket values are placeholders for discovered identifiers, never executable values.

Ordinary `subagent`: omit provider/model/effort for defaults. An explicit route needs provider + model together, authorized in this Session; effort requires that pair and a supported value. Provider-only discovery is valid; model-only discovery is not. Reuse valid Session evidence.

`subagent_fork`, `subagent_codex`, and `subagent_claude_code` have their own schemas. Do not transfer ordinary route keys into them. Dedicated backends have separate configuration and do not support follow-up messages.

Recheck the next call against its current schema. If the exposed signature prevents omission, resolve a supported valid form before sending; never fill unused keys with empty strings/null or replace a required default choice with a different route. A start acknowledgement is not completion.
