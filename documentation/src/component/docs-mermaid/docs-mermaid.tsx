import { Component, h, Prop, State, Watch } from '@stencil/core';
import mermaid from 'mermaid/dist/mermaid.min.js';

@Component({
    tag: 'docs-mermaid',
    styleUrl: 'docs-mermaid.css',
    shadow: true,
})
export class DocsMermaid {
    @Prop() code!: string;
    @State() svg!: string;

    async componentWillLoad() {
        this.svg = await this.renderMermaid(this.code);
    }

    @Watch('code')
    async onCodeChange(code: string) {
        this.svg = '';
        this.svg = await this.renderMermaid(code);
    }

    render() {
        return <div innerHTML={this.svg} />;
    }

    private renderMermaid = (code: string) => {
        return new Promise<string>((resolve) => {
            mermaid.render('todo', code, resolve);
        });
    };
}
