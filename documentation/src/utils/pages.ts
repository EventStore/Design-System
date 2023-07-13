import type { FunctionalComponent } from '@stencil/core';
import type { MDXLayoutProps } from '@eventstore-ui/stencil-markdown-plugin';

export interface SectionDef {
    title: string;
    Page?: FunctionalComponent<MDXLayoutProps>;
    children: Array<SectionDef | PackageDef>;
}

export interface PackageDef {
    title: string;
    rootPath: string;
}

export interface DocsPage {
    url: string;
    title: string;
    icon?: string;
    Page?: FunctionalComponent<MDXLayoutProps>;
    children?: Array<DocsPage>;
}

interface RequireContext<T> {
    (path: string): T;
    keys: () => string[];
}

declare let require: any;
const requireReadme: RequireContext<FunctionalComponent<MDXLayoutProps>> =
    require.context('../../../', true, /^((?!node_modules).)*\/readme\.md$/);

const joinUrls = (...paths: string[]) => {
    const result = [];

    for (const path of paths) {
        for (const slug of path.split('/')) {
            switch (slug) {
                case '..': {
                    result.pop();
                    break;
                }
                case '.': {
                    // do nothing
                    break;
                }
                default: {
                    result.push(slug);
                    break;
                }
            }
        }
    }

    return result.join('/').replace('//', '/');
};

const pathToTitle = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 2];
};

const createDocsPage = (path: string, parent: string): DocsPage => {
    const title = pathToTitle(path);

    return {
        url: joinUrls(parent, title),
        title,
        Page: requireReadme(path),
    };
};

export const pages = (layout: SectionDef): DocsPage => mapSection(layout, '/');

const mapDef = (def: SectionDef | PackageDef, parent: string): DocsPage => {
    if ('rootPath' in def) {
        return mapPackage(def, parent);
    }
    return mapSection(def, parent);
};

const mapPackage = (
    { rootPath, title }: PackageDef,
    parent: string,
): DocsPage => {
    const page: DocsPage = {
        url: joinUrls(parent, rootPath),
        title: title,
    };

    try {
        const readmePath = `${rootPath}/readme.md`;
        const readme = requireReadme(readmePath);

        page.Page = readme;
    } catch (error) {
        // no readme
    }

    const children = requireReadme
        .keys()
        .filter((readme) => readme.startsWith(`${rootPath}/src`));

    if (children.length) {
        page.children = children.map((child) =>
            createDocsPage(child, page.url),
        );
    }

    return page;
};

const mapSection = (section: SectionDef, parent: string): DocsPage => {
    const page: DocsPage = {
        url: parent,
        title: section.title,
    };

    if (section.Page) {
        page.Page = section.Page;
    }

    if (section.children) {
        page.children = section.children.map((child) =>
            mapDef(child, page.url),
        );
    }

    return page;
};
