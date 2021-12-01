import { readFileSync } from 'fs';
import { join } from 'path';

export const version = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8'),
).version;
