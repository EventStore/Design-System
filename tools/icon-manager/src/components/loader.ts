import type { IndexMap } from '../utils/indexFile';

export const convertToLoader = (indexMap: IndexMap, namespaceVar?: string) => `\
import { iconStore } from '@eventstore/components';
${namespaceVar ? `import { ${namespaceVar} } from './namespace';` : ''}

iconStore.addIcons(${namespaceVar ? `${namespaceVar}, ` : ''}{
    ${Array.from(indexMap)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .reduce<string[]>((acc, [name, { path, component, aliases }]) => {
            acc.push(
                `get '${name}'(){return import('${path.replace(
                    '.tsx',
                    '',
                )}').then(({ ${component} }) => ${component})}`,
            );

            aliases?.forEach((alias) => {
                acc.push(`get '${alias}'(){return this['${name}']}`);
            });

            return acc;
        }, [])
        .join(',')}
});
`;
