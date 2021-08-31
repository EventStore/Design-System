import { JSONOutput } from 'typedoc';

const nameMatch = /([A-Z][A-Za-z]+)/g;

export const extractTypes = (typeName: string): string[] => {
    const matched: string[] = [];

    if (isIntrinsic(typeName)) return matched;

    if (nameMatch.test(typeName)) {
        const matches = Array.from(typeName.match(nameMatch)!);

        for (const match of matches) {
            if (isIntrinsic(match)) continue;
            matched.push(match);
        }
    }

    return matched;
};

const intrinsics = [
    'string',
    'number',
    'boolean',
    'undefined',
    'null',
    'any',
    'unknown',
    'Map',
    'Set',
    'Record',
    'Array',
    'Promise',
];
export const isIntrinsic = (typeName: string) => intrinsics.includes(typeName);

export const tryFindTypeInTypedocs = (
    typedoc: JSONOutput.DeclarationReflection,
    typeName: string,
): JSONOutput.DeclarationReflection | undefined => {
    if (typedoc.name === typeName) return typedoc;

    if (typedoc.children) {
        for (const child of typedoc.children) {
            const found = tryFindTypeInTypedocs(child, typeName);
            if (found) return found;
        }
    }
};
