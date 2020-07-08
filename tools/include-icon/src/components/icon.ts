import { ComponentMetadata } from '../utils/componentMetadata';

export const convertToComponent = (
    icon: string,
    metadata: ComponentMetadata,
) => `
import { h } from '@stencil/core';

export const ${metadata.component} = (props: any) => (
    ${icon.replace('<svg', '<svg {...props}')}
);
`;
