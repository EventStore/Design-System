import {
    Component,
    h,
    Host,
    Prop,
    State,
    Watch,
    Fragment,
} from '@stencil/core';

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
    @State() building!: boolean;
    @State() parts!: Parts;
    @State() error?: string;
    @State() active!: string;
    @State() preview!: boolean;

    @State() models!: Models;
    @State() tabs!: HTMLEsTabsElement['tabs'];

    @Watch('usage')
    componentWillLoad() {
        this.building = true;

        const { parts, preview } = extractPartsFromMarkdown(this.usage);

        this.preview = preview;
        this.parts = parts;
        this.models = createModels(this.parts, this.onEditorChange);
        this.tabs = Object.values(this.parts)
            .filter(({ hidden }) => !hidden)
            .map(({ fileName, title }) => ({
                id: fileName,
                title,
            }));

        this.active = this.tabs[0].id;
    }

    @Watch('parts')
    async generatePreview() {
        if (!this.preview) return;

        const files = generatePreview(this.parts);
        const result = await bundle(files);

        this.error = result.error;

        if (result.bundle) {
            this.reloadPreview(result.bundle);
        }
    }

    render() {
        return (
            <Host class={{ 'no-preview': !this.preview }}>
                {this.preview && (
                    <>
                        {this.building && (
                            <div class={'building'}>{'loading preview...'}</div>
                        )}

                        <iframe
                            ref={this.captureiFrame}
                            src={HTML}
                            class={{ hidden: this.building }}
                        />
                    </>
                )}
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

    private tabChange = (e: CustomEvent<string>) => {
        this.active = e.detail;
    };

    private onEditorChange = (key: string, value: string) => {
        this.parts = {
            ...this.parts,
            [key]: {
                ...this.parts[key],
                content: value,
            },
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
                this.building = false;
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
