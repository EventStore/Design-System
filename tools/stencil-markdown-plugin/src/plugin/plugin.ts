import { transpile } from '@stencil/core/compiler';
import { createFilter } from '@rollup/pluginutils';
import { createCompiler } from '@mdx-js/mdx';

const mdxLayoutDefinition = 'const MDXLayout = "wrapper"\n';

const postProcess = (contents: string) => {
    let content = contents;
    const imports = ["import { h } from '@stencil/core';"];

    if (content.includes(mdxLayoutDefinition)) {
        content = content.replace(mdxLayoutDefinition, '');
        imports.push(
            "import { MDXLayout } from '@eventstore/stencil-markdown-plugin/dist/MDXLayout';",
        );
    }

    return `
        ${imports.join('\n')}
        ${content}
    `;
};

export const mdx = () => {
    const filter = createFilter(/mdx?$/);
    const mdxCompiler = createCompiler();

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
