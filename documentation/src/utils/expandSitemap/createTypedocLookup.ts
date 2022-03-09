import type { JSONOutput } from 'typedoc';

export type TypedocLookup = Map<
    number | string,
    JSONOutput.DeclarationReflection
>;

export const createTypedocLookup = (
    typedoc: JSONOutput.ProjectReflection,
): TypedocLookup => {
    const typeMap: TypedocLookup = new Map();

    const insertTypeAndDecendants = (
        type: JSONOutput.DeclarationReflection,
    ) => {
        typeMap.set(type.id, type);
        typeMap.set(type.name, type);

        if (type.children) {
            type.children.forEach(insertTypeAndDecendants);
        }
    };

    insertTypeAndDecendants(typedoc);

    return typeMap;
};
