import type { JSONOutput } from 'typedoc';
import { TypedocLookup } from 'utils/expandSitemap/createTypedocLookup';
import { isReferenceType } from './someType';

export const findAllReferences = (
    declaration: JSONOutput.DeclarationReflection,
    lookup: TypedocLookup,
): JSONOutput.DeclarationReflection[] => {
    const referenceNames = new Set<string>();

    const findReferences = (dec: JSONOutput.DeclarationReflection) => {
        if (dec.type && isReferenceType(dec.type)) {
            referenceNames.add(dec.type.name);
        }

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
