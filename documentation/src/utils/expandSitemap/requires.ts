import { MDXLayoutProps } from '@eventstore/stencil-markdown-plugin';
import { FunctionalComponent, JsonDocs } from '@stencil/core/internal';
import { PackageJson } from '.';

interface RequireContext<T> {
    (path: string): T;
    keys: () => string[];
}

declare global {
    interface NodeRequire {
        context<T>(
            base: string,
            useSubdirectories: boolean,
            regexp: RegExp,
        ): RequireContext<T>;
    }
}

export const requireReadme = require.context<
    FunctionalComponent<MDXLayoutProps>
>('../../../../', true, /^((?!node_modules).)*\/readme\.md$/);

export const requirePackageJson = require.context<PackageJson>(
    '../../../../',
    true,
    /^((?!node_modules|dist).)*\/package\.json$/,
);

const requireDocs = require.context<JsonDocs>(
    '../../../generated',
    true,
    /.*\.json$/,
);

export const optionallyRequireDocs = (slug: string) => {
    try {
        return requireDocs(`./${slug}.json`);
    } catch (error) {
        return undefined;
    }
};
