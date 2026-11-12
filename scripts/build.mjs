import { mkdir, copyFile, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const out = new URL('dist/', root);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'app.js', 'survey.js']) {
  await copyFile(new URL(file, root), new URL(file, out));
}
console.log('Static assets prepared in dist/');
