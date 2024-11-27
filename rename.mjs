import { readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';

const toRename = [];

const readDeep = async (path) => {
    const files = await readdir(path, { withFileTypes: true });
    for (const entry of files) {
        if (entry.name.startsWith('es-')) {
            toRename.push([
                join(entry.path, entry.name),
                join(entry.path, entry.name.replace('es-', '')),
            ]);
        }

        if (entry.isDirectory()) {
            await readDeep(join(entry.path, entry.name));
        }
    }
};

const path = join(process.cwd(), 'packages/components/src/components');
await readDeep(path);

toRename.sort(([a], [b]) => {
    const aa = a.split('/').length;
    const bb = b.split('/').length;

    if (aa !== bb) return bb - aa;

    return b.length - a.length;
});

for (const [from, to] of toRename) {
    console.log(from, '->', to);
    await rename(from, to);
}

console.log('done');
