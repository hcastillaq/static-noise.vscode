import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { validateThemeManifest } from '../scripts/validate-theme.mjs';

test('accepts a manifest whose theme path exists and contains JSON', async () => {
  await validateThemeManifest(path.resolve('package.json'));
});

test('preserves upstream TextMate tokens and supports semantic token rules', async () => {
  const theme = JSON.parse(await readFile('themes/static-noise-color-theme.json', 'utf8'));

  assert.ok(Array.isArray(theme.tokenColors));
  assert.equal(theme.semanticHighlighting, true);
  if (Object.hasOwn(theme, 'semanticTokenColors')) {
    assert.ok(typeof theme.semanticTokenColors === 'object' && theme.semanticTokenColors !== null);
  }
});

test('rejects a manifest whose theme path is missing', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'static-noise-theme-'));
  const manifestPath = path.join(directory, 'package.json');

  try {
    await writeFile(manifestPath, JSON.stringify({
      contributes: { themes: [{ path: './themes/missing.json' }] }
    }));

    await assert.rejects(validateThemeManifest(manifestPath));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
