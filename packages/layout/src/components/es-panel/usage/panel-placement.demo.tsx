import { Component, Host, h, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import {
    Page,
    bannerHeight,
    cookieHeight,
    panelHeight,
    sidebarWidth,
    toolbarWidth,
} from '../../../';

import { areas } from './validPositions';

/**
 * es-panel-placement
 */
@Component({
    tag: 'es-panel-placement-demo',
    styleUrl: 'panel-placement.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    @State() auto = false;

    @State() areaIndex = 0;
    @State() startIndex?: number;
    @State() endIndex?: number;

    componentWillLoad() {
        router.init({ root: '/es-panel-placement-demo/' });
        bannerHeight.set(200);
        cookieHeight.set(200);
        panelHeight.set(200);
        sidebarWidth.set(200);
        toolbarWidth.set(200);
    }

    disconnectedCallback() {
        clearTimeout(this.timeout);
    }

    render() {
        const [area, starts, ends] = areas[this.areaIndex];

        const start =
            this.startIndex != null ? starts[this.startIndex] : undefined;
        const end = this.endIndex != null ? ends[this.endIndex] : undefined;

        return (
            <Host>
                <div class={'area header'}>{'header'}</div>
                <div class={'area banner'}>{'banner'}</div>
                <div class={'area sidebar'}>{'sidebar'}</div>
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
                        {'Auto: '}
                        <input
                            type="checkbox"
                            checked={this.auto}
                            onChange={this.onAutoChange}
                        />
                    </label>

                    <es-panel
                        defaultSize={200}
                        area={area}
                        start={start}
                        end={end}
                    />
                </Page>
                <div class={'area panel'}>{'panel'}</div>
                <div class={'area toolbar'}>{'toolbar'}</div>
                <div class={'area cookie'}>{'cookie'}</div>
            </Host>
        );
    }

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

    private onAutoChange = () => {
        if (this.auto) {
            clearTimeout(this.timeout);
            this.auto = false;
            return;
        }

        this.auto = true;
        this.requestNextArea();
    };

    private timeout!: ReturnType<typeof setTimeout>;
    private requestNextArea = () => {
        if (!this.auto) return;
        this.timeout = setTimeout(() => {
            const [_, starts, ends] = areas[this.areaIndex];

            if (this.startIndex == null || this.endIndex == null) {
                this.startIndex = 0;
                this.endIndex = 0;
            } else if (this.endIndex < ends.length - 1) {
                this.endIndex += 1;
            } else if (
                this.startIndex < starts.length - 1 &&
                this.endIndex >= ends.length - 1
            ) {
                this.startIndex += 1;
                if (starts[0] === ends[0]) {
                    this.endIndex = this.startIndex;
                } else {
                    this.endIndex = this.startIndex - 1;
                }
            } else {
                this.areaIndex =
                    this.areaIndex >= areas.length - 1 ? 0 : this.areaIndex + 1;
                this.startIndex = undefined;
                this.endIndex = undefined;
            }

            this.requestNextArea();
        }, 400);
    };
}
