import { router } from '@kurrent-ui/router';
import { Component, h, Host, Prop, Element, Watch } from '@stencil/core';
import markdown from 'markdown-it';
import anchor from 'markdown-it-anchor';

import { hljs } from './highlight';

const parser = markdown().use(anchor);

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

    private unsubscribe?: () => void;

    @Watch('md')
    componentWillLoad() {
        if (!this.md) return;
        this.host.innerHTML = parser.render(this.md);
        this.host
            .querySelectorAll<HTMLElement>('pre > code')
            .forEach((code) => {
                hljs.highlightElement(code);
            });
    }

    componentDidLoad() {
        if (router.location?.hash) {
            this.scrollTo(router.location.hash);
        }

        this.unsubscribe = router.history?.listen((location) => {
            this.scrollTo(location.hash);
        });
    }

    disconnectedCallback() {
        this.unsubscribe?.();
    }

    render() {
        return <Host />;
    }

    private scrollTo = (id?: string) => {
        if (!id) return;

        const target = this.host.querySelector(id);

        if (!target) return;

        const measure = document.createElement('div');
        measure.style.height = 'var(--layout-body-top)';

        document.body.appendChild(measure);

        const headerOffset = measure.getBoundingClientRect().height;
        const elementPosition = target.getBoundingClientRect().top;

        document.body.removeChild(measure);

        const offsetPosition = elementPosition - headerOffset - 20;

        window.scrollTo({
            top: offsetPosition,
        });
    };
}
