import type { JSONOutput } from 'typedoc';
import { isReferenceType, isUnionType } from './someType';

export const isFunctionalComponentDeclaration = (
    d: JSONOutput.DeclarationReflection,
): boolean => {
    if (!d.signatures) return false;
    const [signature] = d.signatures;
    const returnType = signature.type;
    if (!returnType || !isUnionType(returnType)) return false;
    return returnType.types.some(
        (t) => isReferenceType(t) && t.name === 'VNode',
    );
};
