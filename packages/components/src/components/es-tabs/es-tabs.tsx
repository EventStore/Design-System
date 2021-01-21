import { Component, h, Prop, Host, State, Watch } from '@stencil/core';
import { searchParam } from '@eventstore/router';
import type { Tab } from './types';

@Component({
    tag: 'es-tabs',
    styleUrl: 'es-tabs.css',
    shadow: true,
})
export class EsTabs {
    @Prop() tabs!: Tab[];
    @Prop() activeParam: string = 'tab';
    @State() active!: string;

    private searchParam = searchParam(this.activeParam);

    componentWillLoad() {
        this.active = this.searchParam.value ?? this.tabs[0].id;
    }

    disconnectedCallback() {
        this.searchParam.delete();
        cancelAnimationFrame(this.frame1);
        cancelAnimationFrame(this.frame2);
    }

    @Watch('active') updateUrl(active?: string) {
        this.searchParam.set(active);
    }

    renderTab = ({ title, id, badge }: Tab) => (
        <button
            type={'button'}
            role={'tab'}
            aria-controls={id}
            aria-selected={this.active === id}
            id={`tab-${id}`}
            class={{ tab: true, active: this.active === id }}
            onClick={this.setActive(id)}
            ref={this.captureTab(id)}
        >
            <y-badge count={badge?.() ? 1 : 0} variant={'dot'}>
                {title}
            </y-badge>
        </button>
    );

    render() {
        return (
            <Host>
                <header role={'tablist'}>
                    {this.tabs.map(this.renderTab)}
                </header>
                <div
                    aria-labelledby={`tab-${this.active}`}
                    class={{
                        panel: true,
                        [this.getActive()?.panelVariant ?? '']: true,
                    }}
                    role={'tabpanel'}
                >
                    <div
                        role={'presentation'}
                        class={'indicator'}
                        ref={this.captureIndicatior}
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

    @Watch('active') positionIndicator(active: string) {
        const tab = this.tabRefs.get(active);
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