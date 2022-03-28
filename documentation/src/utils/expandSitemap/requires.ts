import type { JsonDocs } from '@stencil/core/internal';
import type { ProjectReflection } from 'typedoc';
import type { PackageJson } from '.';

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

export const requireReadme = require.context<string>(
    '../../../../',
    true,
    /^((?!node_modules).)*\/readme\.md$/,
);

export const requirePackageJson = require.context<PackageJson>(
    '../../../../',
    true,
    /^((?!node_modules|dist).)*\/package\.json$/,
);

const requireStencilDocs = require.context<JsonDocs>(
    '../../../generated',
    true,
    /.*\.stencil\.json$/,
);

export const optionallyRequireStencilDocs = (slug: string) => {
    try {
        return requireStencilDocs(`./${slug}.stencil.json`);
    } catch (error) {
        return undefined;
    }
};

const requireTypeDocs = require.context<ProjectReflection>(
    '../../../generated',
    true,
    /.*\.typedoc\.json$/,
);

export const optionallyRequireTypeDocs = (slug: string) => {
    try {
        return requireTypeDocs(`./${slug}.typedoc.json`);
    } catch (error) {
        return undefined;
    }
};
