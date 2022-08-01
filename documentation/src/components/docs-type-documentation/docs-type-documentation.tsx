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
        if (!this.declaration) return null;
        return <DeclarationReflection declaration={this.declaration} />;
    }
}
