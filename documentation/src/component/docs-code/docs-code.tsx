import { Component, h, Prop } from '@stencil/core';
// import { highlight } from 'highlight.js/lib/core';
// import something from 'highlight.js/lib/languages/';

@Component({
    tag: 'docs-code',
    styleUrl: 'docs-code.css',
    shadow: true,
})
export class DocsCode {
    @Prop() language!: string;
    @Prop() code!: string;

    render() {
        // console.log(this.language, this.code);
        // const html = highlight(this.language, this.code);
        // console.log(html);

        return <div>{this.code}</div>;
    }
}
