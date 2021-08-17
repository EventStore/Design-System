import { h, FunctionalComponent } from '@stencil/core';
import { JSONOutput } from 'typedoc';
import { isReflectionType } from 'utils/typedoc/someType';
import { DeclarationReflection } from './DeclarationReflection';

export const SomeType: FunctionalComponent<{
    type: JSONOutput.SomeType;
}> = ({ type }) => {
    if (isReflectionType(type)) {
        if (type.declaration) {
            return <DeclarationReflection declaration={type.declaration} />;
        }
    }

    return <docs-type someType={type} />;
};
