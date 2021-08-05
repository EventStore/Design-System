import { Component, h } from '@stencil/core';

@Component({
    tag: 'docs-declaration',
    styleUrl: 'docs-declaration.css',
    shadow: true,
})
export class DocsDeclaration {
    render() {
        return (
            <div>
                <p>Hello DocsDeclaration!</p>
            </div>
        );
    }
}
