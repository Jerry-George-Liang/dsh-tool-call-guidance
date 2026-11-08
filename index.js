import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const name = 'local-tool-call-guidance';
export const inject = ['skills', 'systemPrompt'];

function loadSkill(skillName) {
  return readFileSync(new URL(`./skills/${skillName}/SKILL.md`, import.meta.url), 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

// Keep the portable core and persistent instructions identical.
export const GUIDANCE = loadSkill('tool-call-planning');

const SKILLS = [
  {
    name: 'tool-call-planning',
    description: 'Validate every call and carry the rules through later steps; includes DSH task-query recipes.',
  },
  {
    name: 'subagent-routing',
    description: 'Prepare every delegation or model-discovery call with valid current-session routing.',
  },
];

export function apply(ctx) {
  for (const definition of SKILLS) {
    const directory = new URL(`./skills/${definition.name}/`, import.meta.url);
    ctx.effect(() => ctx.skills.register({
      ...definition,
      source: 'runtime',
      content: definition.name === 'tool-call-planning' ? GUIDANCE : loadSkill(definition.name),
      resourceBase: { kind: 'directory', path: fileURLToPath(directory) },
    }));
  }
  ctx.effect(() => ctx.systemPrompt.section({
    name: 'local-tool-call-guidance',
    order: 850,
    text: GUIDANCE,
  }));
}
