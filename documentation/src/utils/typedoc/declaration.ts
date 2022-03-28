import { isReferenceType, isUnionType } from './someType';
import type { SomeReflection } from './types';

export const isFunctionalComponentDeclaration = (
    d: SomeReflection,
): boolean => {
    if (!('signatures' in d) || !d.signatures) return false;
    const [signature] = d.signatures;
    const returnType = signature.type;
    if (!returnType || !isUnionType(returnType)) return false;
    return returnType.types.some(
        (t) => isReferenceType(t) && t.name === 'VNode',
    );
};
