import { IndexMap } from '../utils/indexFile';

export const convertToLoader = (indexMap: IndexMap) => `
import { iconStore } from '@eventstore/components';

iconStore.addIcons({
    ${Array.from(indexMap)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(
            ([name, { path, component }]) =>
                `get '${name}'(){return import('${path.replace(
                    '.tsx',
                    '',
                )}').then((module) => module.${component})}`,
        )
        .join(',')}
});
`;
