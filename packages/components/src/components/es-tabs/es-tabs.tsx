import {
    Component,
    h,
    Prop,
    Host,
    Event,
    Watch,
    EventEmitter,
    Element,
} from '@stencil/core';
import { searchParam } from '@eventstore/router';
import type { Tab } from './types';

/**
 * A tabbed panel. Each panel can be targeted via a slot.
 * @slot [tabName] - Slots are created based off of the names of the passed tabs.
 * @part indicator - The sliding indicatior bar.
 * @part panel - Tab panels.
 * @part tab - Tabs.
 * @part tablist - The tab container.
 */
@Component({
    tag: 'es-tabs',
    styleUrl: 'es-tabs.css',
    shadow: true,
})
export class EsTabs {
    @Element() host!: HTMLEsTabsElement;

    /** A list of tabs. */
    @Prop() tabs!: Tab[];
    /** Reflect the active tab to a search param of name. Set to false to disable. */
    @Prop() activeParam: string | false = 'tab';
    /** The currently active panel. By default it will take from the passed activeParam, or the first tab.  */
    @Prop({ mutable: true }) active?: string;

    /** Triggered when the active tab is changed. `detail` is the newly active tab. */
    @Event() tabChange!: EventEmitter<string>;

    private searchParam = this.activeParam
        ? searchParam(this.activeParam)
        : undefined;

    componentWillLoad() {
        if (this.active && this.searchParam && !this.searchParam.value) {
            this.searchParam.set(this.active);
        }

        this.active = this.searchParam?.value ?? this.active ?? this.tabs[0].id;
    }

    disconnectedCallback() {
        this.searchParam?.delete();
        cancelAnimationFrame(this.frame1);
        cancelAnimationFrame(this.frame2);
    }

    @Watch('active') updateActive(active?: string) {
        // workaround for https://github.com/ionic-team/stencil/issues/2982
        if (active) {
            const slot = this.host.shadowRoot?.querySelector('slot');

            if (slot) {
                slot.name = active;
            }
        }

        this.searchParam?.set(active);
        this.tabChange.emit(active);
    }

    renderTab = ({ title, id, badge }: Tab) => (
        <button
            type={'button'}
            role={'tab'}
            aria-controls={id}
            aria-selected={this.active === id}
            id={`tab-${id}`}
            class={{ tab: true, active: this.active === id }}
            part={'tab'}
            onClick={this.setActive(id)}
            ref={this.captureTab(id)}
        >
            <es-badge count={badge?.() ? 1 : 0} variant={'dot'}>
                {title}
            </es-badge>
        </button>
    );

    render() {
        return (
            <Host>
                <header role={'tablist'} part={'tablist'}>
                    {this.tabs.map(this.renderTab)}
                </header>
                <div
                    aria-labelledby={`tab-${this.active}`}
                    class={{
                        panel: true,
                        [this.getActive()?.panelVariant ?? '']: true,
                    }}
                    role={'tabpanel'}
                    part={'panel'}
                >
                    <div
                        role={'presentation'}
                        class={'indicator'}
                        ref={this.captureIndicatior}
                        part={'indicator'}
                    />
                    <slot name={this.active} />
                </div>
            </Host>
        );
    }

    private setActive = (id: string) => () => {
        this.active = id;
    };

    private getActive = () => this.tabs.find(({ id }) => id === this.active);

    private tabRefs = new Map<string, HTMLButtonElement>();
    private captureTab = (id: string) => (ref?: HTMLButtonElement) => {
        if (ref) {
            this.tabRefs.set(id, ref);

            if (!this.initialized && id === this.active) {
                this.positionIndicator(this.active);
            }
        } else {
            this.tabRefs.delete(id);
        }
    };

    private indicator?: HTMLDivElement;
    private captureIndicatior = (ref?: HTMLDivElement) => {
        this.indicator = ref;
        this.positionIndicator(this.active);
    };

    private initialized = false;
    private frame1!: ReturnType<typeof requestAnimationFrame>;
    private frame2!: ReturnType<typeof requestAnimationFrame>;

    @Watch('active') positionIndicator(active?: string) {
        const tab = this.tabRefs.get(active!);
        const indicator = this.indicator;
        if (!indicator || !tab) return;

        const initial = !this.initialized;
        this.initialized = true;

        cancelAnimationFrame(this.frame1);
        this.frame1 = requestAnimationFrame(() => {
            const { width, paddingLeft, paddingRight } = getComputedStyle(tab);
            const left = tab.offsetLeft;
            const newWidth = `calc(${width} - ${paddingLeft} - ${paddingRight})`;
            const transform = `translateX(calc(${left}px + ${paddingLeft}))`;
            indicator.style.width = newWidth;
            indicator.style.transform = transform;

            if (initial) {
                this.frame2 = requestAnimationFrame(() => {
                    indicator.style.transitionProperty = 'width, transform';
                });
            }
        });
    }
}
