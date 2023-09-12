/* eslint-disable no-console */
import { createServer, type RequestListener } from 'node:http';
import {
    join,
    dirname,
    resolve,
    isAbsolute,
    extname,
    basename,
} from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { cwd } from 'node:process';
import type { AddressInfo } from 'node:net';
import { EventEmitter } from 'node:events';
import { createRequire } from 'node:module';

import typescript from 'typescript';
// 'typescript' is a CommonJS module, which may not support all module.exports as named exports.
const { JsxEmit, ModuleKind, ScriptTarget, transpileModule } = typescript;

import {
    type IndexFileDetails,
    readIndexFileDetails,
} from '../utils/indexFile.js';
import { debounce } from '../utils/debounce.js';

interface DisplayOptions {
    dir: string;
    watch: boolean;
    port?: number;
}

export const display = async ({
    dir,
    port,
    watch: shouldWatch,
}: DisplayOptions) => {
    const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
    let indexFile = await readIndexFileDetails(directory);
    const reload = new EventEmitter();

    const server = createServer((req, res) => {
        const meta = { directory, indexFile, reload, shouldWatch };
        switch (true) {
            case req.url === '/': {
                return index(meta)(req, res);
            }
            case req.url === '/reload': {
                return hotReload(meta)(req, res);
            }
            case req.url === '/icons.js': {
                return iconDetails(meta)(req, res);
            }
            case req.url?.startsWith('/lib/@eventstore-ui/components'): {
                return esComponents(meta)(req, res);
            }
            case req.url?.startsWith('/lib/icons'): {
                return icons(meta)(req, res);
            }
            default: {
                res.writeHead(404);
                res.end();
            }
        }
    });

    server
        .listen(port)
        .on('error', (e: any) => {
            if (e.code === 'EADDRINUSE') {
                console.log('Address in use, retrying...');
                const currentPort = e.port;
                const nextPort = currentPort ? currentPort + 1 : undefined;
                server.close();
                server.listen(nextPort);
            }
        })
        .on('listening', () => {
            console.log(
                `Icons displaying at http://localhost:${
                    (server.address() as AddressInfo).port
                }`,
            );
            if (shouldWatch) {
                console.log('Watching for changes..');
            }
        });

    if (shouldWatch) {
        const fileChange = debounce(async () => {
            indexFile = await readIndexFileDetails(directory);
            reload.emit('reload');
            console.log('File changed, reloading..');
        }, 500);

        watch(directory).on('change', fileChange);
        watch(join(directory, '/components')).on('change', fileChange);
    }
};

interface IconsMeta {
    directory: string;
    indexFile: IndexFileDetails;
    reload: EventEmitter;
    shouldWatch: boolean;
}
type RequestHandler = (meta: IconsMeta) => RequestListener;

const index: RequestHandler =
    ({ shouldWatch }) =>
    async (_, res) => {
        res.writeHead(200);
        res.end(`
    <!DOCTYPE html>
    <html dir="ltr" lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Event Store Design System</title>
            <meta name="Description" content="Event Store Design System" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
            />
            <meta http-equiv="x-ua-compatible" content="IE=Edge" />
            <script type="module" src="/lib/@eventstore-ui/components/es-components/es-components.esm.js" data-stencil></script>
            <script type="module" src="/lib/icons/index.js"></script>
            <script type="module">
                import { icons, namespace } from '/icons.js';

                const $main = document.querySelector('main');
                for (const icon of icons) {
                    const $div = document.createElement('div');
                    $div.classList.add('icon');
                    const $icon = document.createElement('es-icon');
                    $icon.icon = namespace ? [namespace, icon] : icon;
                    const $name = document.createElement('span');
                    $name.innerText = icon;
                    $div.append($icon);
                    $div.append($name);
                    $main.append($div);
                }
            </script>
            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: auto;
                    max-width: 800px;
                }
            
                main {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 80px);
                    gap: 20px;
                    max-width: 100%;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    min-width: 80px;
                    align-items: center;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <main></main>
        </body>

        ${
            shouldWatch
                ? '<script type="module">fetch("/reload").then(() => window.location.reload(false));</script>'
                : ''
        }
        
    </html>    
    `);
    };

const iconDetails: RequestHandler =
    ({ indexFile }) =>
    async (_req, res) => {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/javascript; charset=utf-8',
            });
            res.end(`
            ${
                indexFile.namespace
                    ? "import { ICON_NAMESPACE } from '/lib/icons/namespace'"
                    : ''
            } 
            export const namespace = ${
                indexFile.namespace ? 'ICON_NAMESPACE' : 'false'
            };
            export const icons = ${JSON.stringify(
                Array.from(indexFile.indexMap, ([_, { name }]) => name),
            )};
        `);
        } catch (error: any) {
            res.writeHead(404);
            res.end(error.toString());
        }
    };

const require = createRequire(import.meta.url);
const esComponentsDir = join(
    dirname(require.resolve('@eventstore-ui/components/package.json')),
    '/dist',
);
const resolveESComponents = (path: string) => join(esComponentsDir, path);
const esComponents: RequestHandler = () => async (req, res) => {
    try {
        const path = resolveESComponents(
            req.url!.replace('/lib/@eventstore-ui/components', ''),
        );
        const file = await readFile(path);
        res.writeHead(200, {
            'Content-Type': 'text/javascript; charset=utf-8',
        });
        res.end(file);
    } catch (error: any) {
        res.writeHead(404);
        res.end(error.toString());
    }
};

const findPath = async (path: string): Promise<string> => {
    const dir = dirname(path);
    const extless = basename(path, extname(path));
    for (const ext of ['ts', 'tsx', 'js', 'jsx']) {
        try {
            const realPath = join(dir, `${extless}.${ext}`);
            await stat(realPath);
            return realPath;
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                continue;
            }
            throw error;
        }
    }
    return path;
};

const transpile = (
    file: string,
    fileName: string,
    indexFile: IndexFileDetails,
) => {
    const output = transpileModule(file, {
        fileName,
        compilerOptions: {
            target: ScriptTarget.ES2021,
            module: ModuleKind.ESNext,
            jsx: JsxEmit.React,
            jsxFactory: 'h',
            jsxFragmentFactory: 'Fragment',
        },
    });
    return output.outputText.replace(
        indexFile.iconStoreImportPath ?? '@eventstore-ui/components',
        '/lib/@eventstore-ui/components/es-components/index.esm.js',
    );
};
const icons: RequestHandler =
    ({ directory, indexFile }): RequestListener =>
    async (req, res) => {
        try {
            const path = join(directory, req.url!.replace('/lib/icons', ''));
            const tsPath = await findPath(path);
            const file = await readFile(tsPath);
            const transpiled = transpile(file.toString(), tsPath, indexFile);
            res.writeHead(200, {
                'Content-Type': 'text/javascript; charset=utf-8',
            });
            res.end(transpiled);
        } catch (error: any) {
            console.log(error);
            res.writeHead(404);
            res.end(error.toString());
        }
    };

const hotReload: RequestHandler =
    ({ reload }): RequestListener =>
    async (_req, res) => {
        try {
            await new Promise((r) => reload.once('reload', r));
            res.writeHead(200);
            res.end('reload');
        } catch (error: any) {
            res.writeHead(404);
            res.end(error.toString());
        }
    };
