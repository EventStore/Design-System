import type {
    ArrayType,
    ConditionalType,
    IndexedAccessType,
    InferredType,
    IntersectionType,
    IntrinsicType,
    LiteralType,
    MappedType,
    NamedTupleMember,
    OptionalType,
    PredicateType,
    QueryType,
    ReferenceType,
    ReflectionType,
    RestType,
    TemplateLiteralType,
    TupleType,
    Type,
    TypeOperatorType,
    UnionType,
    UnknownType,
} from 'typedoc';

export const displaySomeType = (someType?: Type): string => {
    if (!someType) return '';

    if (isIntrinsicType(someType)) {
        return someType.name;
    }

    if (isArrayType(someType)) {
        return `${displaySomeType(someType.elementType)}[]`;
    }

    if (isUnionType(someType)) {
        return someType.types.map(displaySomeType).join(' | ');
    }

    if (isUnknownType(someType)) {
        return 'unknown';
    }

    if (isPredicateType(someType)) {
        return `${someType.asserts ? 'asserts ' : ''}${someType.name}${
            someType.targetType
                ? ` is ${displaySomeType(someType.targetType)}`
                : ''
        }`;
    }

    if (isReferenceType(someType)) {
        let typeArgs = '';
        if (someType.typeArguments && someType.typeArguments.length > 0) {
            typeArgs += '<';
            typeArgs += someType.typeArguments.map(displaySomeType).join(', ');
            typeArgs += '>';
        }
        return someType.name + typeArgs;
    }

    if (isConditionalType(someType)) {
        return `${displaySomeType(
            someType.checkType,
        )} extends ${displaySomeType(someType.extendsType)} ? ${displaySomeType(
            someType.trueType,
        )} : ${displaySomeType(someType.falseType)}`;
    }

    if (isIndexedAccessType(someType)) {
        return `${displaySomeType(someType.objectType)}[${displaySomeType(
            someType.indexType,
        )}]`;
    }

    if (isInferredType(someType)) {
        return `infer ${someType.name}`;
    }

    if (isIntersectionType(someType)) {
        return someType.types.map(displaySomeType).join(' & ');
    }

    if (isLiteralType(someType)) {
        return JSON.stringify(someType.value);
    }

    if (isOptionalType(someType)) {
        return `${displaySomeType(someType.elementType)}?`;
    }

    if (isQueryType(someType)) {
        return `typeof ${displaySomeType(someType.queryType)}`;
    }

    if (isReflectionType(someType)) {
        return someType.declaration?.signatures ? 'function' : 'object';
    }

    if (isRestType(someType)) {
        return `...${displaySomeType(someType.elementType)}`;
    }

    if (isTupleType(someType)) {
        return `[${someType.elements?.map(displaySomeType).join(', ')}]`;
    }

    if (isTypeOperatorType(someType)) {
        return `${someType.operator} ${displaySomeType(someType.target)}`;
    }

    return 'unknown';
};

export const isArrayType = (someType: Type): someType is ArrayType =>
    someType.type === 'array';

export const isConditionalType = (
    someType: Type,
): someType is ConditionalType => someType.type === 'conditional';

export const isIndexedAccessType = (
    someType: Type,
): someType is IndexedAccessType => someType.type === 'indexedAccess';

export const isInferredType = (someType: Type): someType is InferredType =>
    someType.type === 'inferred';

export const isIntersectionType = (
    someType: Type,
): someType is IntersectionType => someType.type === 'intersection';

export const isIntrinsicType = (someType: Type): someType is IntrinsicType =>
    someType.type === 'intrinsic';

export const isLiteralType = (someType: Type): someType is LiteralType =>
    someType.type === 'literal';

export const isOptionalType = (someType: Type): someType is OptionalType =>
    someType.type === 'optional';

export const isPredicateType = (someType: Type): someType is PredicateType =>
    someType.type === 'predicate';

export const isQueryType = (someType: Type): someType is QueryType =>
    someType.type === 'query';

export const isReferenceType = (someType: Type): someType is ReferenceType =>
    someType.type === 'reference';

export const isReflectionType = (someType: Type): someType is ReflectionType =>
    someType.type === 'reflection';

export const isRestType = (someType: Type): someType is RestType =>
    someType.type === 'rest';

export const isTupleType = (someType: Type): someType is TupleType =>
    someType.type === 'tuple';

export const isTypeOperatorType = (
    someType: Type,
): someType is TypeOperatorType => someType.type === 'typeOperator';

export const isUnionType = (someType: Type): someType is UnionType =>
    someType.type === 'union';

export const isUnknownType = (someType: Type): someType is UnknownType =>
    someType.type === 'unknown';

export const isNamedTupleMember = (
    someType: Type,
): someType is NamedTupleMember => someType.type === 'named-tuple-member';

export const isMappedType = (someType: Type): someType is MappedType =>
    someType.type === 'mapped';

export const isTemplateLiteralType = (
    someType: Type,
): someType is TemplateLiteralType => someType.type === 'template-literal';
