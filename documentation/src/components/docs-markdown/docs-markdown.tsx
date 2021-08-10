import { Component, h, Host, Prop, Element, Watch } from '@stencil/core';
import markdown from 'markdown-it';

@Component({
    tag: 'docs-markdown',
    styleUrl: 'docs-markdown.css',
})
export class DocsMarkdown {
    @Element() host!: HTMLDocsMarkdownElement;
    @Prop() md!: string;

    private parser = markdown();

    @Watch('md')
    componentWillLoad() {
        this.host.innerHTML = this.parser.render(this.md);
    }

    render() {
        return <Host />;
    }
}
