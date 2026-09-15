import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const sha = process.env.STATIC_NOISE_SHA;
const version = process.env.STATIC_NOISE_VERSION;
const bootstrap = process.env.STATIC_NOISE_BOOTSTRAP === 'true';

if (!/^[0-9a-f]{40}$/i.test(sha ?? '')) {
  throw new Error('STATIC_NOISE_SHA must be a full 40-character commit SHA.');
}
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version ?? '')) {
  throw new Error('STATIC_NOISE_VERSION must be a semantic version without a leading v.');
}

const sourcePath = 'dist/vscode/static-noise-color-theme.json';
const sourceUrl = `https://raw.githubusercontent.com/hcastillaq/static-noise/${sha}/${sourcePath}`;
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Could not download ${sourceUrl}: ${response.status}`);
const theme = await response.text();
JSON.parse(theme);

const root = path.resolve(import.meta.dirname, '..');
await writeFile(path.join(root, 'themes/static-noise-color-theme.json'), theme);
await writeFile(path.join(root, 'UPSTREAM.md'), `# Static Noise upstream provenance\n\n- **Repository:** https://github.com/hcastillaq/static-noise\n- **Version:** ${version}\n- **Commit SHA:** \`${sha}\`\n- **Source path:** \`${sourcePath}\`\n\n\`themes/static-noise-color-theme.json\` is a byte-for-byte copy of this generated upstream artifact. Do not edit it locally. When updating it, record the new immutable commit SHA here and increment the extension version in \`package.json\` before creating a new VSIX.\n`);

const packagePath = path.join(root, 'package.json');
const extensionPackage = JSON.parse(await readFile(packagePath, 'utf8'));
const versionMatch = /^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/.exec(extensionPackage.version);
if (!versionMatch) throw new Error(`Unsupported extension version: ${extensionPackage.version}`);
const extensionVersion = bootstrap
  ? extensionPackage.version
  : `${versionMatch[1]}.${versionMatch[2]}.${Number(versionMatch[3]) + 1}`;
extensionPackage.version = extensionVersion;
await writeFile(packagePath, `${JSON.stringify(extensionPackage, null, 2)}\n`);

const lockPath = path.join(root, 'package-lock.json');
const lock = JSON.parse(await readFile(lockPath, 'utf8'));
lock.version = extensionVersion;
if (lock.packages?.['']) lock.packages[''].version = extensionVersion;
await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);

console.log(`Synchronized VS Code theme from Static Noise v${version} (${sha}); extension ${bootstrap ? 'remains' : 'is now'} v${extensionVersion}.`);
