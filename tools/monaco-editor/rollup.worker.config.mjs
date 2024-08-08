import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const monacoPath = dirname(
    createRequire(import.meta.url).resolve('monaco-editor/package.json'),
);
const workerPath = join(monacoPath, '/esm/vs/');
const workers = {
    editor: join(workerPath, 'editor/editor.worker.js'),
    json: join(workerPath, 'language/json/json.worker.js'),
    ts: join(workerPath, 'language/typescript/ts.worker.js'),
    css: join(workerPath, 'language/css/css.worker.js'),
    html: join(workerPath, 'language/html/html.worker.js'),
};

// eslint-disable-next-line no-restricted-syntax
export default () => {
    const worker = process.env.WORKER ?? 'editor';
    return {
        input: workers[worker],
        context: 'self',
        output: [
            {
                file: `workers/${worker}.worker.js`,
                format: 'iife',
                name: `${worker}Worker`,
            },
        ],
    };
};
