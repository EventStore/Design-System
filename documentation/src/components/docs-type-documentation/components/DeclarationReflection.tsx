import { h, type FunctionalComponent } from '@stencil/core';
import {
    isTypeLiteral,
    isVariable,
    isProperty,
    isInterface,
    isClass,
} from 'utils/typedoc/reflectionKind';
import type { SomeReflection } from 'utils/typedoc/types';
import { ClassTable } from './ClassTable';
import { InterfaceTable } from './InterfaceTable';
import { ObjectTable } from './ObjectTable';
import { SomeType } from './SomeType';

export const DeclarationReflection: FunctionalComponent<{
    declaration: SomeReflection;
}> = ({ declaration }) => {
    if (isVariable(declaration)) {
        if (declaration.type) {
            return <SomeType type={declaration.type} />;
        }
    }

    if (isTypeLiteral(declaration)) {
        if (declaration.children && declaration.children.every(isProperty)) {
            return <ObjectTable declaration={declaration} />;
        }
    }

    if (isInterface(declaration)) {
        return <InterfaceTable declaration={declaration} />;
    }

    if (isClass(declaration)) {
        return <ClassTable declaration={declaration} />;
    }

    return <docs-type declaration={declaration} />;
};
