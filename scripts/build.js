import { mkdir, copyFile, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

const files = [
  ['index.html', 'dist/index.html'],
  ['src/main.js', 'dist/src/main.js'],
  ['src/styles.css', 'dist/src/styles.css'],
];

await rm('dist', { recursive: true, force: true });
for (const [source, target] of files) {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}
console.log('Built Apex Mechanical dashboard to dist/');
