import type { SomeReflection } from 'utils/typedoc/types';

export type TypedocLookup = Map<number | string, SomeReflection>;

export const createTypedocLookup = (typedoc: SomeReflection): TypedocLookup => {
    const typeMap: TypedocLookup = new Map();

    const insertTypeAndDecendants = (type: SomeReflection) => {
        typeMap.set(type.id, type);
        typeMap.set(type.name, type);

        if ('children' in type && type.children) {
            type.children.forEach(insertTypeAndDecendants);
        }
    };

    insertTypeAndDecendants(typedoc);

    return typeMap;
};
