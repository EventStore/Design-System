import type { ComponentMetadata } from '../utils/componentMetadata';
import type { Loaded } from '../utils/loadIcon';

export const convertToComponent = (
    { kind, content }: Loaded,
    metadata: ComponentMetadata,
) => `\
/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from "@stencil/core";

export const ${metadata.component} = (h: typeof JSXFactory) => (props: any) => (
    ${kind === 'svg' ? content.replace('<svg', '<svg {...props}') : content}
);
`;
