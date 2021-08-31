import { Component, h, Prop } from '@stencil/core';
import { JSONOutput } from 'typedoc';
import { DeclarationReflection } from './components/DeclarationReflection';

@Component({
    tag: 'docs-type-documentation',
    styleUrl: 'docs-type-documentation.css',
    shadow: true,
})
export class DocsTypeDocumentation {
    @Prop() declaration!: JSONOutput.DeclarationReflection;

    render() {
        return <DeclarationReflection declaration={this.declaration} />;
    }
}
