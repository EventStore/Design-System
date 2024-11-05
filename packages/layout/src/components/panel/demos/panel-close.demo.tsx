import { Component, Host, State, h } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import { ES_LAYOUT_ICON_NAMESPACE, Page } from '../../../../';
import { areas } from './validPositions';
import type { PanelMode } from '../types';

/**
 * Panel closing
 * @group Panels
 */
@Component({
    tag: 'es-panel-close-demo',
    styleUrl: 'panel-close.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    @State() areaIndex = 0;
    @State() startIndex?: number;
    @State() endIndex?: number;
    @State() customClosed = true;
    @State() currentMode: PanelMode = 'inline';

    componentWillLoad() {
        router.init({ root: '/es-panel-close-demo/' });
    }

    render() {
        const [area, starts, ends] = areas[this.areaIndex];

        const start =
            this.startIndex != null ? starts[this.startIndex] : undefined;
        const end = this.endIndex != null ? ends[this.endIndex] : undefined;

        return (
            <Host>
                <Page pageTitle={'body'}>
                    <label>
                        {'Area: '}
                        <select onChange={this.onAreaChange}>
                            {areas.map(([a], i) => (
                                <option key={a} value={i} selected={area === a}>
                                    {a}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        {'Start: '}
                        <select onChange={this.onStartChange}>
                            <option value={'none'} selected={start == null}>
                                {'default'}
                            </option>
                            {starts.map((s, i) => (
                                <option
                                    key={s}
                                    value={i}
                                    selected={start === s}
                                >
                                    {s}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        {'End: '}
                        <select onChange={this.onEndChange}>
                            <option value={'none'} selected={end == null}>
                                {'default'}
                            </option>
                            {ends.map((s, i) => (
                                <option key={s} value={i} selected={end === s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        {'Custom Closed: '}
                        <input
                            type="checkbox"
                            checked={this.customClosed}
                            onChange={this.onCustomClosedChange}
                        />
                    </label>

                    <es-panel
                        defaultSize={200}
                        area={area}
                        start={start}
                        end={end}
                        closedMode={'collapsed'}
                        onModeChange={this.onModeChange}
                    >
                        {this.customClosed &&
                            this.currentMode === 'collapsed' && (
                                <div
                                    slot={'handle'}
                                    class={`collapsed ${area}`}
                                >
                                    <es-icon
                                        icon={[
                                            ES_LAYOUT_ICON_NAMESPACE,
                                            'chevron',
                                        ]}
                                    />
                                    {area}
                                    <es-icon
                                        icon={[
                                            ES_LAYOUT_ICON_NAMESPACE,
                                            'chevron',
                                        ]}
                                    />
                                </div>
                            )}
                        <p>{'Some content for the panel'}</p>
                    </es-panel>
                </Page>
            </Host>
        );
    }

    private onModeChange = (e: CustomEvent<PanelMode>) => {
        this.currentMode = e.detail;
    };

    private onAreaChange = (e: Event) => {
        const value = (e.target as HTMLSelectElement).value;
        this.areaIndex = parseInt(value);
        this.startIndex = undefined;
        this.endIndex = undefined;
    };

    private onStartChange = (e: Event) => {
        const value = (e.target as HTMLSelectElement).value;
        this.startIndex = value === 'none' ? undefined : parseInt(value);
    };

    private onEndChange = (e: Event) => {
        const value = (e.target as HTMLSelectElement).value;
        this.endIndex = value === 'none' ? undefined : parseInt(value);
    };

    private onCustomClosedChange = () => {
        this.customClosed = !this.customClosed;
    };
}
