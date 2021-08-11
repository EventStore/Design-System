import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { createModels } from './utils/createModels';
import { extractPartsFromMarkdown } from './utils/extractPartsFromMarkdown';
import { generatePreview } from './utils/generatePreview';
import type { Models, Parts } from './utils/types';
import { bundle } from './utils/usage.worker';

const HTML = '/preview.html';

@Component({
    shadow: true,
    tag: 'docs-usage',
    styleUrl: 'docs-usage.css',
})
export class DocsUsage {
    private iframe?: HTMLIFrameElement;

    @Prop() identifier!: string;
    @Prop() usage!: string;
    @State() parts!: Parts;
    @State() error?: string;
    @State() active: keyof Models = 'render';

    @State() models!: Models;

    @Watch('usage')
    componentWillLoad() {
        this.parts = extractPartsFromMarkdown(this.usage);
        this.models = createModels(this.parts, this.onEditorChange);
    }

    @Watch('parts')
    async generatePreview() {
        const files = generatePreview(this.parts);
        const result = await bundle('/preview-component.tsx', files);

        this.error = result.error;

        if (result.bundle) {
            this.reloadPreview(result.bundle);
        }
    }

    render() {
        return (
            <Host>
                <iframe ref={this.captureiFrame} src={HTML} />
                <es-tabs
                    tabs={this.tabs}
                    active={this.active}
                    activeParam={false}
                    onTabChange={this.tabChange}
                >
                    <es-editor
                        key={`${this.identifier}-${this.active}`}
                        slot={this.active}
                        options={{
                            model: this.models[this.active],
                        }}
                    />
                </es-tabs>
            </Host>
        );
    }

    private tabs: HTMLEsTabsElement['tabs'] = [
        { title: 'Render', id: 'render' },
        { title: 'Style', id: 'css' },
    ];

    private tabChange = (e: CustomEvent<string>) => {
        this.active = e.detail as keyof Models;
    };

    private onEditorChange = (key: string, value: string) => {
        this.parts = {
            ...this.parts,
            [key]: value,
        };
    };

    private reloadPreview = (bundle: string) => {
        if (!this.iframe || !this.iframe.contentWindow) return;

        this.iframe.addEventListener(
            'load',
            () => {
                const doc = this.iframe!.contentDocument!;
                const script = doc.createElement('script');
                script.setAttribute('type', 'module');
                script.innerHTML = bundle;
                doc.head.appendChild(script);

                doc.body.innerHTML = '<preview-component></preview-component>';
            },
            { once: true },
        );

        const { location } = this.iframe.contentWindow;

        if (location.pathname !== HTML) {
            location.pathname = HTML;
        } else {
            location.reload();
        }
    };

    private captureiFrame = (el?: HTMLIFrameElement) => {
        this.iframe = el;
    };
}
