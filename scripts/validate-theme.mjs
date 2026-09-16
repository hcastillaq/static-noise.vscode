import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export async function validateThemeManifest(manifestPath) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const themes = manifest.contributes?.themes;

  if (!Array.isArray(themes) || themes.length === 0) {
    throw new Error('package.json must declare at least one contributes.themes entry.');
  }

  for (const theme of themes) {
    if (typeof theme.path !== 'string' || theme.path.length === 0) {
      throw new Error('Each contributes.themes entry must declare a non-empty path.');
    }

    const themePath = path.resolve(path.dirname(manifestPath), theme.path);
    await stat(themePath);
    const themeJson = JSON.parse(await readFile(themePath, 'utf8'));
    if (!themeJson.name || !themeJson.type || !themeJson.colors) {
      throw new Error(`Theme at ${theme.path} is missing required fields (name, type, or colors).`);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifestPath = path.resolve(process.argv[2] ?? 'package.json');

  try {
    await validateThemeManifest(manifestPath);
    console.log(`Validated theme paths in ${manifestPath}.`);
  } catch (error) {
    console.error(`Theme validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
