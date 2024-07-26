"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdx = void 0;
const path_1 = require("path");
const compiler_1 = require("@stencil/core/compiler");
const pluginutils_1 = require("@rollup/pluginutils");
const mdx_1 = require("@mdx-js/mdx");
const visit = require("unist-util-visit");
const mdxLayoutDefinition = 'const MDXLayout = "wrapper"\n';
const componentPath = (0, path_1.resolve)(__dirname, './dist/MDXLayout');
const postProcess = (contents) => {
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
const pluginFromVisitor = ({ test, visitor }) => () => (tree) => {
    visit(tree, test, (node, index, parent) => {
        const reply = visitor(node, index, parent);
        if (parent && reply === 'skip') {
            parent.children.splice(index, 1);
        }
    });
};
const fixStyleTags = () => (tree) => {
    visit(tree, 'jsx', (node) => {
        if (node.value.includes('<style>')) {
            node.value = node.value.replace(/(?<=<style>)([\s\S]*)(?=<\/style>)/g, (css) => '{`' + css.replace(/`/g, '\\`') + '`}');
        }
    });
};
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
const mdx = (options = {}) => {
    var _a;
    const visitors = (_a = options.visitors) !== null && _a !== void 0 ? _a : [];
    const filter = (0, pluginutils_1.createFilter)(/mdx?$/);
    const mdxCompiler = (0, mdx_1.createCompiler)({
        remarkPlugins: [...visitors.map(pluginFromVisitor), fixStyleTags],
    });
    return {
        name: 'mdx',
        transform: async (contents, path) => {
            if (!filter(path))
                return;
            const mdx = await mdxCompiler.process({ contents, path });
            const jsx = postProcess(mdx.contents);
            const transpiled = await (0, compiler_1.transpile)(jsx, {
                coreImportPath: '@stencil/core',
            });
            return transpiled;
        },
    };
};
exports.mdx = mdx;
