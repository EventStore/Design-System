import { Component, h, Host, Prop, Element, Watch } from '@stencil/core';
import markdown from 'markdown-it';

const parser = markdown();

const isExternal = (href: string) => {
    try {
        return href && new URL(href).origin !== location.origin;
    } catch (error) {
        return false;
    }
};

parser.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const href = tokens[idx].attrGet('href');
    if (href && isExternal(href)) {
        tokens[idx].attrPush(['target', '_blank']);
        tokens[idx].attrPush(['rel', 'noreferrer']);
    }
    return self.renderToken(tokens, idx, options);
};

@Component({
    tag: 'docs-markdown',
    styleUrl: 'docs-markdown.css',
})
export class DocsMarkdown {
    @Element() host!: HTMLDocsMarkdownElement;
    @Prop() md!: string;

    @Watch('md')
    componentWillLoad() {
        this.host.innerHTML = parser.render(this.md);
    }

    render() {
        return <Host />;
    }
}
