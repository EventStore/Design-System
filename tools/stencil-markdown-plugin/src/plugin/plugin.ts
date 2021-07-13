import { resolve } from 'path';

import { transpile } from '@stencil/core/compiler';
import { createFilter } from '@rollup/pluginutils';
import { createCompiler } from '@mdx-js/mdx';
import * as visit from 'unist-util-visit';
import type { Node } from 'unist';

const mdxLayoutDefinition = 'const MDXLayout = "wrapper"\n';
const componentPath = resolve(__dirname, './dist/MDXLayout');

const postProcess = (contents: string) => {
    let content = contents;
    const imports = ["import { h } from '@stencil/core';"];

    if (content.includes(mdxLayoutDefinition)) {
        content = content.replace(mdxLayoutDefinition, '');
        imports.push(`import { MDXLayout } from '${componentPath}';`);
    }

    return `
        ${imports.join('\n')}
        ${content}
    `;
};

interface JSXNode extends Node {
    value: string;
}

const fixStyleTags = () => (tree: Node) => {
    visit(tree, 'jsx', (node: JSXNode) => {
        if (node.value.includes('<style>')) {
            node.value = node.value.replace(
                /(?<=<style>)([\s\S]*)(?=<\/style>)/g,
                (css) => '{`' + css.replace(/`/g, '\\`') + '`}',
            );
        }
    });
};

export const mdx = () => {
    const filter = createFilter(/mdx?$/);
    const mdxCompiler = createCompiler({ remarkPlugins: [fixStyleTags] });

    return {
        name: 'mdx',
        transform: async (contents: string, path: string) => {
            if (!filter(path)) return;

            const mdx = await mdxCompiler.process({ contents, path });
            const jsx = postProcess(mdx.contents);
            const transpiled = await transpile(jsx, {
                coreImportPath: '@stencil/core',
            });

            return transpiled;
        },
    };
};
