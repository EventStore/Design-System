import type { JSONOutput } from 'typedoc';
import type { TypedocLookup } from 'utils/expandSitemap/createTypedocLookup';
import { isArrayType, isReferenceType, isUnionType } from './someType';

export const findAllReferences = (
    declaration: JSONOutput.DeclarationReflection,
    lookup: TypedocLookup,
): JSONOutput.DeclarationReflection[] => {
    const referenceNames = new Set<string>();
    const visited = new Set<number>();

    const insertIfReference = (type?: JSONOutput.SomeType) => {
        if (!type || !isReferenceType(type) || type.name === declaration.name) {
            return;
        }

        referenceNames.add(type.name);
    };

    const findReferences = (dec: JSONOutput.DeclarationReflection) => {
        if (visited.has(dec.id)) return;
        visited.add(dec.id);

        insertIfReference(dec.type);

        dec.children?.forEach(findReferences);
        dec.signatures?.forEach(findReferences);

        (dec as JSONOutput.SignatureReflection).parameters?.forEach(
            findReferences,
        );

        if (!dec.type) return;

        const type = dec.type;

        if ((type as JSONOutput.ReflectionType).declaration) {
            findReferences((type as JSONOutput.ReflectionType).declaration!);
        }

        if (isReferenceType(type) && type.typeArguments) {
            type.typeArguments?.forEach(insertIfReference);
        }

        if (isUnionType(type)) {
            type.types.forEach(insertIfReference);
        }

        if (isArrayType(type)) {
            insertIfReference(type.elementType);
        }

        if (isReferenceType(type) && type.id != null && lookup.has(type.id)) {
            findReferences(lookup.get(type.id)!);
        }
    };

    findReferences(declaration);

    const references = [];

    for (const reference of referenceNames) {
        if (lookup.has(reference)) {
            references.push(lookup.get(reference)!);
        }
    }

    return references;
};
