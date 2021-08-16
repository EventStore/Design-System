import { h, FunctionalComponent, Fragment } from '@stencil/core';
import { JSONOutput } from 'typedoc';
import {
    isTypeLiteral,
    isVariable,
    isProperty,
} from 'utils/typedoc/reflectionKind';
import { ObjectTable } from './ObjectTable';
import { SomeType } from './SomeType';

export const DeclarationReflection: FunctionalComponent<{
    declaration: JSONOutput.DeclarationReflection;
}> = ({ declaration }) => {
    if (isVariable(declaration)) {
        if (declaration.type) {
            return <SomeType type={declaration.type} />;
        }
    }

    if (isTypeLiteral(declaration)) {
        if (declaration.children && declaration.children.every(isProperty)) {
            // its an object!
            return <ObjectTable declaration={declaration} />;
        }
    }

    return (
        <>
            {'TODO: '}
            {declaration.kindString}
        </>
    );
};
