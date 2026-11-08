import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { apply } from '../index.js';

test('plugin loads without a tools service, resolves portable resources, and releases registrations', () => {
  const registered = new Map();
  const cleanups = [];
  const register = key => value => {
    assert.equal(registered.has(key), false, `duplicate resource: ${key}`);
    registered.set(key, value);
    return () => registered.delete(key);
  };
  // Intentionally no tools service: the plugin must only contribute guidance.
  const ctx = {
    effect(fn) { cleanups.push(fn()); },
    skills: { register(value) {
      assert.equal(typeof value.source, 'string', 'SkillRegistration requires a discovery source');
      return register(`skill:${value.name}`)(value);
    } },
    systemPrompt: { section(value) { return register(`section:${value.name}`)(value); } },
  };
  for (let activation = 0; activation < 2; activation++) {
    apply(ctx);
    const skills = [...registered.entries()].filter(([key]) => key.startsWith('skill:'));
    assert.equal(skills.length, 2);
    assert.equal(registered.size, 3);
    assert.equal(
      registered.get('section:local-tool-call-guidance').text,
      registered.get('skill:tool-call-planning').content,
      'Persistent instructions must stay identical to the portable core',
    );
    for (const [, skill] of skills) {
      assert.equal(skill.resourceBase.kind, 'directory');
      assert.match(skill.content, /^# /);
      assert.doesNotMatch(skill.content, /^---/);
      const full = readFileSync(path.join(skill.resourceBase.path, 'SKILL.md'), 'utf8');
      assert.match(full, new RegExp(`name: ${skill.name}`));
      for (const [, relative] of skill.content.matchAll(/\]\((references\/[^)]+)\)/g)) {
        assert.ok(existsSync(path.join(skill.resourceBase.path, relative)), `missing resource: ${relative}`);
      }
    }
    for (const cleanup of cleanups.splice(0).reverse()) cleanup();
    assert.equal(registered.size, 0);
  }
});
