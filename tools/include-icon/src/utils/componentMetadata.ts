import * as camelCase from 'camelcase';

export interface ComponentMetadata {
    name: string;
    component: string;
    path: string;
}

export const componentMetadata = (name: string): ComponentMetadata => ({
    name,
    component: camelCase(name, { pascalCase: true }),
    path: `./components/${camelCase(name, { pascalCase: true })}.tsx`,
});
