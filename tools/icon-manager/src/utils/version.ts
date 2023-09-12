import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const version = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8'),
).version;
