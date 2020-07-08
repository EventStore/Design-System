export const convertToComponent = (icon: string, componentName: string) => `
import { h } from '@stencil/core';

export const ${componentName} = (props: any) => (
    ${icon.replace('<svg', '<svg {...props}')}
);
`;
