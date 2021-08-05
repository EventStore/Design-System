import { Component, h, Fragment, VNode, Prop } from '@stencil/core';
import { JSONOutput } from 'typedoc';
import {
    isIntrinsicType,
    isTypeParameterType,
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
} from 'utils/typedoc/someType';

@Component({
    tag: 'docs-type',
    styleUrl: 'docs-type.css',
    shadow: true,
})
export class DocsSomeType {
    @Prop({ reflect: true }) depreciated: boolean = false;
    @Prop() string?: string;
    @Prop() someType?: JSONOutput.SomeType;

    render() {
        if (this.string) return this.string;
        if (this.someType) return this.renderSomeType(this.someType);
        return null;
    }

    private renderSomeType = (
        someType: JSONOutput.SomeType,
    ): VNode | VNode[] => {
        if (isIntrinsicType(someType)) {
            return (
                <span class={`intrinsic ${someType.name}`}>
                    {someType.name}
                </span>
            );
        }

        if (isTypeParameterType(someType)) {
            return <span class={'parameter'}>{someType.name}</span>;
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
                    {someType.declaration?.signatures ? 'function' : 'object'}
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
                    {'...'}
                    {someType.elements?.map((option, i, { length }) => (
                        <>
                            {this.renderSomeType(option)}
                            {i !== length - 1 && ' | '}
                        </>
                    ))}
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
}
