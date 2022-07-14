import { resolve } from 'path';

import { transpile } from '@stencil/core/compiler';
import type { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { createCompiler } from '@mdx-js/mdx';
import * as visit from 'unist-util-visit';
import type { Node } from 'unist';

const mdxLayoutDefinition = 'const MDXLayout = "wrapper"\n';
const componentPath = resolve(__dirname, './dist/MDXLayout');

const postProcess = (contents: string) => {
    let content = contents;
    const imports = ["import { h, Fragment } from '@stencil/core';"];

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

/**
 * Select nodes from the tree with `test`  (for example: 'comment' or 'jsx').
 * Directly modify a node in the visitor, or return `skip` to skip the node.
 */
export interface Visitor {
    test: string;
    visitor: (node: JSXNode, index: number, parent?: Node) => void | 'skip';
}

const pluginFromVisitor = ({ test, visitor }: Visitor) => () => (
    tree: Node,
) => {
    visit<JSXNode>(tree, test, (node, index, parent) => {
        const reply = visitor(node, index, parent);
        if (parent && reply === 'skip') {
            parent.children.splice(index, 1);
        }
    });
};

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

export interface MDXOptions {
    /** Apply custom visitors to map or skip nodes from the tree. */
    visitors?: Visitor[];
}

/**
 * Stencil plugin to import markdown and mdx files as components.
 *
 * Usage:
 * `stencil.config.ts`
 * ``` ts
 *  import { mdx } from '@eventstore-ui/stencil-markdown-plugin/plugin';
 *
 *  export const config: Config = {
 *    plugins: [
 *      mdx(),
 *   ],
 *  };
 * ```
 */
export const mdx = (options: MDXOptions = {}): Plugin => {
    const visitors = options.visitors ?? [];
    const filter = createFilter(/mdx?$/);
    const mdxCompiler = createCompiler({
        remarkPlugins: [...visitors.map(pluginFromVisitor), fixStyleTags],
    });

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
