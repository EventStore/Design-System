import type {
    DeclarationReflection,
    ReflectionType,
    SignatureReflection,
    Type,
} from 'typedoc';
import type { TypedocLookup } from 'utils/expandSitemap/createTypedocLookup';
import { isArrayType, isReferenceType, isUnionType } from './someType';
import type { SomeReflection } from './types';

export const findAllReferences = (
    reflection: SomeReflection,
    lookup: TypedocLookup,
): SomeReflection[] => {
    const referenceNames = new Set<string>();
    const visited = new Set<number>();

    const insertIfReference = (type?: Type) => {
        if (!type || !isReferenceType(type) || type.name === reflection.name) {
            return;
        }

        referenceNames.add(type.name);
    };

    const findReferences = (refl: SomeReflection) => {
        if (visited.has(refl.id)) return;
        visited.add(refl.id);

        (refl as DeclarationReflection).children?.forEach(findReferences);
        (refl as DeclarationReflection).signatures?.forEach(findReferences);

        (refl as SignatureReflection).parameters?.forEach(findReferences);

        if (!('type' in refl) || refl.type == null) return;

        const type = refl.type;

        insertIfReference(type);

        if ((type as ReflectionType).declaration) {
            findReferences((type as ReflectionType).declaration!);
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

        if (
            isReferenceType(type) &&
            type.name != null &&
            lookup.has(type.name)
        ) {
            findReferences(lookup.get(type.name)!);
        }
    };

    findReferences(reflection);

    const references = [];

    for (const reference of referenceNames) {
        if (lookup.has(reference)) {
            references.push(lookup.get(reference)!);
        }
    }

    return references;
};
