import { Component, h, Host, Prop, State, Watch, Build } from '@stencil/core';

import { extractPartsFromMarkdown } from './utils/extractPartsFromMarkdown';
import type { Models, Settings } from './utils/types';

import { createModels } from './utils/createModels';

@Component({
    shadow: true,
    tag: 'docs-usage',
    styleUrl: 'docs-usage.css',
})
export class DocsUsage {
    @Prop() identifier!: string;
    @Prop() usage!: string;

    @State() active!: string;
    @State() options!: Omit<Settings, 'parts'>;
    @State() contentHeight = 500;

    @State() models: Models = {};
    @State() tabs: HTMLEsTabsElement['tabs'] = [];

    @Watch('usage')
    componentWillLoad() {
        const { parts, ...options } = extractPartsFromMarkdown(
            this.usage ?? '',
        );

        this.options = options;
        if (!Build.isServer) {
            this.models = createModels(parts);
        }
        this.tabs = Object.values(parts)
            .filter(({ hidden }) => !hidden)
            .map(({ fileName, title }) => ({
                id: fileName,
                title,
            }));
    }

    render() {
        return (
            <Host
                class={{
                    no_preview: !this.options.preview,
                    no_code: !this.options.code,
                    grow: !!this.options.grow,
                }}
            >
                {this.options.preview && !Build.isServer && (
                    <iframe
                        data-identifier={this.identifier}
                        src={'/preview'}
                        height={
                            this.options.grow
                                ? `${this.options.grow}px`
                                : undefined
                        }
                    />
                )}
                {this.options.code && (
                    <es-tabs
                        tabs={this.tabs}
                        active={this.active}
                        activeParam={false}
                        onTabChange={this.tabChange}
                    >
                        {!Build.isServer && (
                            <es-editor
                                key={`${this.identifier}-${this.active}`}
                                slot={this.active}
                                options={{
                                    readOnly: true,
                                    stickyScroll: { enabled: false },
                                    model: this.models[this.active],
                                }}
                            />
                        )}
                    </es-tabs>
                )}
            </Host>
        );
    }

    private tabChange = (e: CustomEvent<string>) => {
        this.active = e.detail;
    };
}
