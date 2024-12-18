import { expandSitemap } from 'utils/expandSitemap';
export type { Lib } from 'utils/expandSitemap';

export const sitemap = expandSitemap([
    {
        title: 'Web Components',
        children: [
            'Components',
            'Layout',
            'Fields',
            'Router',
            'Editor',
            'Sequences',
        ],
    },
    {
        title: 'Libraries',
        children: ['Utils', 'Stores', 'Theme', 'Forms'],
    },
    {
        title: 'Tools',
        children: ['Configs', 'Assets', 'Icon Manager'],
    },
]);
