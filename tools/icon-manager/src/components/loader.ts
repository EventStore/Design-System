import type { IndexMap } from '../utils/indexFile';

export const convertToLoader = (indexMap: IndexMap, namespaced?: boolean) => `\
import { iconStore } from '@eventstore/components';
${namespaced ? "import { ICON_NAMESPACE } from './namespace';" : ''}

iconStore.addIcons(${namespaced ? 'ICON_NAMESPACE, ' : ''}{
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
