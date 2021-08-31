declare module '*.mdx' {
    import { FunctionalComponent } from '@stencil/core';
    import { MDXLayoutProps } from '@eventstore/stencil-markdown-plugin/dist/MDXLayout';
    const MDXLayout: FunctionalComponent<MDXLayoutProps>;
    export default MDXLayout;
}

declare module '*.md' {
    import { FunctionalComponent } from '@stencil/core';
    import { MDXLayoutProps } from '@eventstore/stencil-markdown-plugin/dist/MDXLayout';
    const MDXLayout: FunctionalComponent<MDXLayoutProps>;
    export default MDXLayout;
}
