import { Component, h, Prop } from '@stencil/core';
import type { SomeReflection } from 'utils/typedoc/types';
import { DeclarationReflection } from './components/DeclarationReflection';

@Component({
    tag: 'docs-type-documentation',
    styleUrl: 'docs-type-documentation.css',
    shadow: true,
})
export class DocsTypeDocumentation {
    @Prop() declaration!: SomeReflection;

    render() {
        return <DeclarationReflection declaration={this.declaration} />;
    }
}
