import type { JSONOutput } from 'typedoc';
import { TypedocLookup } from 'utils/expandSitemap/createTypedocLookup';
import { isReferenceType, isUnionType } from './someType';

export const findAllReferences = (
    declaration: JSONOutput.DeclarationReflection,
    lookup: TypedocLookup,
): JSONOutput.DeclarationReflection[] => {
    const referenceNames = new Set<string>();

    const insertIfReference = (type?: JSONOutput.SomeType) => {
        if (!type || !isReferenceType(type)) return;
        referenceNames.add(type.name);
    };

    const findReferences = (dec: JSONOutput.DeclarationReflection) => {
        insertIfReference(dec.type);

        dec.children?.forEach(findReferences);
        dec.signatures?.forEach(findReferences);
        (dec as JSONOutput.SignatureReflection).parameters?.forEach(
            findReferences,
        );

        if (dec.type && (dec.type as JSONOutput.ReflectionType).declaration) {
            findReferences(
                (dec.type as JSONOutput.ReflectionType).declaration!,
            );
        }

        if (dec.type && isUnionType(dec.type)) {
            dec.type.types.forEach(insertIfReference);
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
