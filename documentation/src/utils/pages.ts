import { FunctionalComponent } from '@stencil/core';
import { MDXLayoutProps } from '@eventstore/stencil-markdown-plugin';

export interface DocsPage {
    url: string;
    title: string;
    Page: FunctionalComponent<MDXLayoutProps>;
}

interface RequireContext<T> {
    (path: string): T;
    keys: () => string[];
}

declare let require: any;
const readmes: RequireContext<FunctionalComponent<
    MDXLayoutProps
>> = require.context('../../../', true, /^((?!node_modules).)*\/readme\.md$/);

const packages: RequireContext<{ name: string }> = require.context(
    '../../../',
    true,
    /^((?!node_modules).)*\/package\.json$/,
);

const pathToTitle = (path: string) => {
    const packagePath = path.replace('readme.md', 'package.json');
    if (packages.keys().includes(packagePath)) {
        const packageJSON = packages(packagePath);
        return packageJSON.name;
    }

    const segments = path.split('/');
    return segments[segments.length - 2];
};

const pathToRoute = (path: string) =>
    path
        .replace(/[\s\S]*\/Design-System/, '')
        .replace(/\/src/, '')
        .replace(/\/readme.md/, '');

const createDocsPage = (path: string): DocsPage => ({
    url: pathToRoute(path),
    title: pathToTitle(path),
    Page: readmes(path),
});

export const pages = (readmes.keys() as string[])
    .reduce<DocsPage[]>(
        (acc, path: string) => [...acc, createDocsPage(path)],
        [],
    )
    .filter(({ url }) => Boolean(url))
    .sort(({ url: a }, { url: b }) => (a > b ? 1 : -1));
