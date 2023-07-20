import { readFile, writeFile, mkdir, rm, readdir } from 'fs/promises';
import { join, relative } from 'path';
import { argv, cwd } from 'process';

import { extractPartsFromMarkdown } from './extractPartsFromMarkdown.js';
import { extractUsages } from './extractUsage.js';

const basePath = join(cwd(), argv[2]);
const outputPath = join(basePath, 'usage');

const run = async () => {
    await rm(outputPath, { force: true, recursive: true });
    await mkdir(outputPath);

    const files = await readdir(basePath).then((baseDir) =>
        baseDir
            .filter((file) => file.endsWith('.json'))
            .map((file) => join(basePath, file)),
    );

    const outputs = await Promise.allSettled(
        files.map((file) => buildFile(file)),
    ).then((r) => r.map((p) => (p.status === 'fulfilled' ? p.value : [])));

    const root = `\
import type { FunctionalComponent } from '@stencil/core';

export interface PreviewSettings {
    grow: number | boolean;
    showLocation: boolean;
    component: FunctionalComponent;
    styles?: string;
}

export const usages = new Map<string, () => Promise<PreviewSettings>>([
${outputs
    .flat()
    .map(
        ([tag, path]) =>
            `    ['${tag}', () => import('./${relative(
                outputPath,
                path,
            )}').then((e) => e.details)],`,
    )
    .join('\n')}
]);    
`;

    writeFile(join(outputPath, 'index.ts'), root);
};

type Output = [identifier: string, path: string];

const buildFile = async (inputFile: string): Promise<Output[]> => {
    const file = await readFile(inputFile);

    const docs = JSON.parse(file.toString());
    const usages = extractUsages(docs);

    const paths: Output[] = [];

    for (const [identifier, value] of usages) {
        const settings = extractPartsFromMarkdown(value as string);

        if (!settings.preview || !settings.usage) continue;

        const path = join(outputPath, identifier);
        paths.push([identifier, path]);

        await mkdir(path);
        await writeFile(join(path, 'usage.tsx'), settings.usage);

        for (const { content, fileName } of Object.values(settings.files)) {
            await writeFile(join(path, fileName), content);
        }

        const indexFile = `\
import Usage from './usage';

${settings.styles ? `const styles = \`\n${settings.styles}\`;\n` : ''}\
export const details = {
    grow: ${String(settings.grow)},
    showLocation: ${String(settings.showLocation)},
    component: Usage,\
${settings.styles ? '\n    styles,' : ''}
};
`;

        writeFile(join(path, 'index.ts'), indexFile);
    }

    return paths;
};

run();
