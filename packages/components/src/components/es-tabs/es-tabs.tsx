import {
    Component,
    h,
    Prop,
    Host,
    Event,
    Watch,
    type EventEmitter,
    Element,
    State,
    Fragment,
} from '@stencil/core';
import { searchParam, type SearchParamTracker } from '@kurrent-ui/router';
import { theme } from '@kurrent-ui/theme';

import type { Tab } from './types';
import type { IconDescription } from '../es-icon/types';

/**
 * A tabbed panel. Each panel can be targeted via a slot.
 * @slot [tabName] - Slots are created based off of the names of the passed tabs.
 * @part [tabName] - The tab and its corresponding panel.
 * @slot header-end - After all the tabs.
 * @part indicator - The sliding indicatior bar.
 * @part panel - Tab panels.
 * @part tab - Tabs.
 * @part active - The active tab.
 * @part tablist - The tab container.
 * @part inter-tab-icon - Icon between tabs (if specified).
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
    /** Icon to be rendered between each tab.  */
    @Prop() interTabIcon?: IconDescription;
    /** thu size of the icon to be rendered between each tab.  */
    @Prop() interTabIconSize: number = 20;

    @State() activeDragOver?: string;

    /** Triggered when the active tab is changed. `detail` is the newly active tab. */
    @Event() tabChange!: EventEmitter<string>;

    private searchParam?: SearchParamTracker;
    private observer = new ResizeObserver(() => {
        this.positionIndicator(this.active);
    });

    componentWillLoad() {
        this.setUpActiveParam(this.activeParam);
        this.updateActiveIfNoMatchesTabs(this.tabs);
    }

    disconnectedCallback() {
        this.observer.disconnect();
        this.searchParam?.delete();
        cancelAnimationFrame(this.indicatorFrame);
        this.dragTimeouts.forEach((t) => clearTimeout(t));
    }

    @Watch('activeParam')
    setUpActiveParam(param: string | false) {
        if (!param) {
            this.searchParam?.delete();
            this.searchParam = undefined;
        } else {
            this.searchParam = searchParam(param);

            if (this.active && this.searchParam && !this.searchParam.value) {
                this.searchParam.set(this.active);
            }
        }

        this.active = this.searchParam?.value ?? this.active ?? this.tabs[0].id;
    }

    @Watch('active')
    updateActive(active?: string) {
        this.searchParam?.set(active);
        this.tabChange.emit(active);
    }

    @Watch('tabs')
    updateActiveIfNoMatchesTabs(tabs: Tab[]) {
        if (tabs.find(({ id }) => id === this.active)) return;
        this.active = this.tabs[0].id;
    }

    renderTab = ({ title, id, badge }: Tab, i: number) => (
        <>
            {i !== 0 && !!this.interTabIcon && (
                <es-icon
                    icon={this.interTabIcon}
                    part={'inter-tab-icon'}
                    size={this.interTabIconSize}
                />
            )}
            <button
                data-skip-focus-delegation
                type={'button'}
                role={'tab'}
                aria-controls={id}
                aria-selected={this.active === id}
                id={`tab-${id}`}
                class={{
                    tab: true,
                    active: this.active === id,
                    drag_over: this.activeDragOver === id,
                }}
                part={`tab ${id} ${this.active === id ? 'active' : ''}`}
                onClick={this.setActive(id)}
                ref={this.captureTab(id)}
                onDragEnter={this.dragEnterTab(id)}
                onDragLeave={this.dragLeaveTab(id)}
                onDrop={this.dropTab(id)}
                onDragOver={this.dragOverTab}
            >
                <es-badge count={badge?.() ? 1 : 0} variant={'dot'}>
                    <span class={'elipsis'}>{title}</span>
                </es-badge>
            </button>
        </>
    );

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
                <header role={'tablist'} part={'tablist'}>
                    {this.tabs.map(this.renderTab)}
                    <slot name={'header-end'} />
                </header>
                <div
                    aria-labelledby={`tab-${this.active}`}
                    class={{
                        panel: true,
                        [this.getActive()?.panelVariant ?? '']: true,
                    }}
                    role={'tabpanel'}
                    part={`panel ${this.active}`}
                >
                    <div
                        role={'presentation'}
                        class={'indicator'}
                        ref={this.captureIndicatior}
                        part={'indicator'}
                    />
                    <slot key={this.active} name={this.active} />
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
            this.observer.observe(ref);

            if (!this.indicatorAttactedTo && id === this.active) {
                this.positionIndicator(this.active);
            }
        } else {
            if (this.tabRefs.has(id)) {
                this.observer.unobserve(this.tabRefs.get(id)!);
            }

            this.tabRefs.delete(id);
        }
    };

    private indicator?: HTMLDivElement;
    private captureIndicatior = (ref?: HTMLDivElement) => {
        this.indicator = ref;
        this.positionIndicator(this.active);
    };

    private indicatorAttactedTo?: string;
    private indicatorFrame!: ReturnType<typeof requestAnimationFrame>;

    @Watch('active') positionIndicator(active?: string) {
        if (!active) return;

        const tab = this.tabRefs.get(active!);
        const indicator = this.indicator;

        if (!indicator || !tab) return;

        if (!!this.indicatorAttactedTo && active !== this.indicatorAttactedTo) {
            indicator.style.setProperty(
                'transition-property',
                'width, transform',
            );
            indicator.addEventListener(
                'transitionend',
                () => {
                    indicator.style.removeProperty('transition-property');
                },
                { once: true },
            );
        }

        cancelAnimationFrame(this.indicatorFrame);
        this.indicatorFrame = requestAnimationFrame(() => {
            const { width, paddingLeft, paddingRight } = getComputedStyle(tab);
            const left = tab.offsetLeft;
            const newWidth = `calc(${width} - ${paddingLeft} - ${paddingRight})`;
            const transform = `translateX(calc(${left}px + ${paddingLeft}))`;
            indicator.style.width = newWidth;
            indicator.style.transform = transform;
            this.indicatorAttactedTo = active;
        });
    }

    private dragTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
    private dragCounts = new Map<string, number>();
    private dragEnterTab = (id: string) => (e: DragEvent) => {
        e.preventDefault();

        const count = (this.dragCounts.get(id) ?? 0) + 1;
        this.dragCounts.set(id, count);

        if (this.dragTimeouts.has(id)) return;
        this.activeDragOver = id;
        this.dragTimeouts.set(
            id,
            setTimeout(() => {
                this.setActive(id)();
            }, 1000),
        );
    };
    private finishDrag = (id: string) => {
        clearTimeout(this.dragTimeouts.get(id)!);
        this.dragTimeouts.delete(id);
        this.dragCounts.delete(id);
        if (this.activeDragOver === id) {
            this.activeDragOver = undefined;
        }
    };
    private dragLeaveTab = (id: string) => (e: DragEvent) => {
        e.preventDefault();
        const count = (this.dragCounts.get(id) ?? 1) - 1;
        this.dragCounts.set(id, count);
        if (count <= 0) {
            this.finishDrag(id);
        }
    };
    private dropTab = (id: string) => (e: DragEvent) => {
        e.preventDefault();
        this.finishDrag(id);
    };
    private dragOverTab = (e: DragEvent) => {
        e.preventDefault();
    };
}
