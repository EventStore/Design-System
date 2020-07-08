import { IndexMap } from '../utils/indexFile';

export const convertToLoader = (indexMap: IndexMap) => `
export const icons = {
    ${Array.from(
        indexMap,
        ([name, path]) => `get '${name}'(){return import('${path}')}`,
    )}
}
`;
