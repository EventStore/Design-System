import { Component, h, Fragment, type VNode, Prop } from '@stencil/core';
import type { SignatureReflection, SomeType } from 'typedoc';
import {
    isCallSignature,
    isConstructorSignature,
    isTypeAlias,
} from 'utils/typedoc/reflectionKind';
import {
    isIntrinsicType,
    isArrayType,
    isUnionType,
    isUnknownType,
    isPredicateType,
    isReferenceType,
    isConditionalType,
    isIndexedAccessType,
    isInferredType,
    isIntersectionType,
    isLiteralType,
    isOptionalType,
    isQueryType,
    isReflectionType,
    isRestType,
    isTupleType,
    isTypeOperatorType,
    isNamedTupleMember,
} from 'utils/typedoc/someType';
import type { SomeReflection } from 'utils/typedoc/types';

@Component({
    tag: 'docs-type',
    styleUrl: 'docs-type.css',
    shadow: true,
})
export class DocsSomeType {
    @Prop({ reflect: true }) depreciated: boolean = false;
    @Prop() string?: string;
    @Prop() someType?: SomeType;
    @Prop() declaration?: SomeReflection;

    render() {
        if (this.string) return this.string;
        if (this.someType) return this.renderSomeType(this.someType);
        if (this.declaration) return this.renderDeclaration(this.declaration);
        return null;
    }

    private renderSomeType = (someType: SomeType | any): VNode | VNode[] => {
        if (isIntrinsicType(someType)) {
            return (
                <span class={`intrinsic ${someType.name}`}>
                    {someType.name}
                </span>
            );
        }

        if (isArrayType(someType)) {
            return (
                <>
                    {this.renderSomeType(someType.elementType)}
                    {'[]'}
                </>
            );
        }

        if (isUnionType(someType)) {
            return (
                <span class={'union'}>
                    {someType.types.map((option, i, { length }) => (
                        <>
                            {this.renderSomeType(option)}
                            {i !== length - 1 && ' | '}
                        </>
                    ))}
                </span>
            );
        }

        if (isIntersectionType(someType)) {
            return (
                <span class={'intersection'}>
                    {someType.types.map((option, i, { length }) => (
                        <>
                            {this.renderSomeType(option)}
                            {i !== length - 1 && ' & '}
                        </>
                    ))}
                </span>
            );
        }

        if (isUnknownType(someType)) {
            return <span class={'unknown'}>{'unknown'}</span>;
        }

        if (isPredicateType(someType)) {
            return (
                <span class={'predicate'}>
                    {someType.asserts && 'asserts '}
                    {someType.name}
                    {someType.targetType && (
                        <>
                            {' is '}
                            {this.renderSomeType(someType.targetType)}
                        </>
                    )}
                </span>
            );
        }

        if (isReferenceType(someType)) {
            return (
                <span class={'reference'}>
                    <span class={'type'}>{someType.name}</span>
                    {!!someType.typeArguments?.length && (
                        <>
                            {'<'}
                            {someType.typeArguments.map(
                                (option, i, { length }) => (
                                    <>
                                        {this.renderSomeType(option)}
                                        {i !== length - 1 && ', '}
                                    </>
                                ),
                            )}
                            {'>'}
                        </>
                    )}
                </span>
            );
        }

        if (isConditionalType(someType)) {
            return (
                <span class={'conditional'}>
                    {this.renderSomeType(someType.checkType)}
                    {' extends '}
                    {this.renderSomeType(someType.extendsType)}
                    {' ? '}
                    {this.renderSomeType(someType.trueType)}
                    {' : '}
                    {this.renderSomeType(someType.falseType)}
                </span>
            );
        }

        if (isIndexedAccessType(someType)) {
            return (
                <span class={'indexed-access'}>
                    {this.renderSomeType(someType.objectType)}
                    {'['}
                    {this.renderSomeType(someType.indexType)}
                    {']'}
                </span>
            );
        }

        if (isInferredType(someType)) {
            return (
                <span class={'inferred'}>
                    {'infer '}
                    {someType.name}
                </span>
            );
        }

        if (isLiteralType(someType)) {
            return (
                <span class={`literal ${typeof someType.value}`}>
                    {JSON.stringify(someType.value)}
                </span>
            );
        }

        if (isOptionalType(someType)) {
            return (
                <span class={'optional'}>
                    {this.renderSomeType(someType.elementType)}
                    {'?'}
                </span>
            );
        }

        if (isQueryType(someType)) {
            return (
                <span class={'query'}>
                    {'typeof '}
                    {this.renderSomeType(someType.queryType)}
                </span>
            );
        }

        if (isReflectionType(someType)) {
            return (
                <span class={'reflection'}>
                    {someType.declaration
                        ? this.renderDeclaration(someType.declaration)
                        : someType.type}
                </span>
            );
        }

        if (isRestType(someType)) {
            return (
                <span class={'rest'}>
                    {'...'}
                    {this.renderSomeType(someType.elementType)}
                </span>
            );
        }

        if (isTupleType(someType)) {
            return (
                <span class={'tuple'}>
                    {'['}
                    {someType.elements?.map((option, i, { length }) => (
                        <>
                            {this.renderSomeType(option)}
                            {i !== length - 1 && ', '}
                        </>
                    ))}
                    {']'}
                </span>
            );
        }

        if (isNamedTupleMember(someType)) {
            return (
                <span class={'member'}>
                    {someType.name}
                    {': '}
                    {this.renderSomeType(someType.element)}
                </span>
            );
        }

        if (isTypeOperatorType(someType)) {
            return (
                <span class={'operator'}>
                    {someType.operator}
                    {this.renderSomeType(someType.target)}
                </span>
            );
        }

        return <span class={'unknown'}>{'unknown'}</span>;
    };

    private renderDeclaration = (
        declaration: SomeReflection,
    ): VNode | VNode[] => {
        if ('signatures' in declaration && declaration.signatures) {
            return <>{declaration.signatures.map(this.renderDeclaration)}</>;
        }

        if (isConstructorSignature(declaration)) {
            const signature = declaration as SignatureReflection;
            return (
                <span class={'constructor'}>
                    <span class={'new'}>{'new '}</span>
                    {signature.type && this.renderSomeType(signature.type)}
                    {'('}
                    {signature.parameters &&
                        signature.parameters.length > 0 && (
                            <span class={'params'}>
                                {signature.parameters?.map((param) => (
                                    <span class={'param'} key={param.name}>
                                        {param.name}
                                        {param.defaultValue ? '?' : ''}
                                        {': '}
                                        {param.type
                                            ? this.renderSomeType(param.type)
                                            : 'any'}
                                        {param.defaultValue &&
                                        param.defaultValue !== '...'
                                            ? ` = ${param.defaultValue}`
                                            : ''}
                                    </span>
                                ))}
                            </span>
                        )}
                    {')'}
                </span>
            );
        }

        if (isCallSignature(declaration)) {
            const signature = declaration as SignatureReflection;
            return (
                <span class={'signature'}>
                    {'('}
                    {signature.parameters &&
                        signature.parameters.length > 0 && (
                            <span class={'params'}>
                                {signature.parameters?.map((param) => (
                                    <span class={'param'} key={param.name}>
                                        {param.name}
                                        {param.defaultValue ? '?' : ''}
                                        {': '}
                                        {param.type
                                            ? this.renderSomeType(param.type)
                                            : 'any'}
                                        {param.defaultValue &&
                                        param.defaultValue !== '...'
                                            ? ` = ${param.defaultValue}`
                                            : ''}
                                    </span>
                                ))}
                            </span>
                        )}
                    {') => '}
                    {declaration.type
                        ? this.renderSomeType(declaration.type)
                        : 'void'}
                </span>
            );
        }

        if (isTypeAlias(declaration)) {
            return (
                <span class={'alias'}>
                    {declaration.name}
                    {declaration.typeParameters && (
                        <>
                            {'<'}
                            <span class={'params'}>
                                {declaration.typeParameters?.map((param) => (
                                    <span class={'param'} key={param.name}>
                                        {param.name}
                                        {' extends '}
                                        {param.type
                                            ? this.renderSomeType(param.type)
                                            : 'any'}
                                    </span>
                                ))}
                            </span>
                            {'>'}
                        </>
                    )}
                    {declaration.type && (
                        <>
                            {' = '}
                            {this.renderSomeType(declaration.type)}
                        </>
                    )}
                </span>
            );
        }

        if ('type' in declaration && declaration.type) {
            return this.renderSomeType(declaration.type);
        }

        return <span class={'unknown'}>{'unknown'}</span>;
    };
}
