import { pascalCase } from 'case-anything';

export interface ComponentMetadata {
    name: string;
    component: string;
    path: string;
    aliases?: string[];
}

export const componentMetadata = (name: string): ComponentMetadata => ({
    name,
    component: pascalCase(name),
    path: `./components/${pascalCase(name)}.tsx`,
});
