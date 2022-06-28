import { expandSitemap } from 'utils/expandSitemap';
export { Lib } from 'utils/expandSitemap';

export const sitemap = expandSitemap([
    {
        title: 'Web Components',
        children: [
            {
                title: 'Components',
                filePath: './packages/components',
            },
            {
                title: 'Layout',
                filePath: './packages/layout',
            },
            {
                title: 'Fields',
                filePath: './packages/fields',
            },
            {
                title: 'Router',
                filePath: './packages/router',
            },
            {
                title: 'Editor',
                filePath: './packages/editor',
            },
            {
                title: 'Illustrations',
                filePath: './packages/illustrations',
            },
        ],
    },
    {
        title: 'Libraries',
        children: [
            {
                title: 'Utils',
                filePath: './packages/utils',
            },
            {
                title: 'Stores',
                filePath: './packages/stores',
            },
            {
                title: 'Theme',
                filePath: './packages/theme',
            },
            {
                title: 'Forms',
                filePath: './packages/forms',
            },
        ],
    },
    {
        title: 'Tools',
        children: [
            {
                title: 'Configs',
                filePath: './tools/configs',
            },
            {
                title: 'Icon Manager',
                filePath: './tools/icon-manager',
            },
            {
                title: 'Postcss Palette Plugin',
                filePath: './tools/postcss-palette-plugin',
            },
            {
                title: 'Stencil Markdown Plugin',
                filePath: './tools/stencil-markdown-plugin',
            },
        ],
    },
]);
