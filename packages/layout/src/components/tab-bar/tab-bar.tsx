import {
    Component,
    h,
    Prop,
    Event,
    Watch,
    type EventEmitter,
    Element,
    State,
    Fragment,
    Host,
} from '@stencil/core';

import { Link, router } from '@kurrent-ui/router';
import type { IconDescription } from '@kurrent-ui/components';
import { theme } from '@kurrent-ui/theme';

import type { RouteTab } from './types';

/**
 * A navigating tab bar.
 * @part tab - Tabs.
 * @part [tabName] - The tab.
 * @part active - The active tab.
 * @part indicator - The sliding indicatior bar.
 * @part inter-tab-icon - Icon between tabs (if specified).
 */
@Component({
    tag: 'l2-tab-bar',
    styleUrl: 'tab-bar.css',
    shadow: true,
})
export class TabBar {
    @Element() host!: HTMLC2TabsElement;

    /** A list of tabs. */
    @Prop() tabs!: RouteTab[];
    /** Icon to be rendered between each tab.  */
    @Prop() interTabIcon?: IconDescription;
    /** thu size of the icon to be rendered between each tab.  */
    @Prop() interTabIconSize: number = 20;

    @State() active?: string;
    @State() activeDragOver?: string;

    /** Triggered when the active tab is changed. `detail` is the newly active tab. */
    @Event() tabChange!: EventEmitter<string>;

    private unsubscribe?: () => void;
    private observer = new ResizeObserver(() => {
        this.positionIndicator(this.active);
    });

    componentWillLoad() {
        this.unsubscribe?.();

        this.unsubscribe = router.history.listen(() => {
            this.active = this.activeFromMatch();
        });

        this.active = this.activeFromMatch();
    }

    disconnectedCallback() {
        this.observer.disconnect();
        this.unsubscribe?.();
        cancelAnimationFrame(this.indicatorFrame);
        this.dragTimeouts.forEach((t) => clearTimeout(t));
    }

    @Watch('active')
    updateActive(active?: string) {
        this.tabChange.emit(active);
    }

    @Watch('tabs')
    updateActiveIfNoMatchesTabs(tabs: RouteTab[]) {
        if (tabs.find(({ id }) => id === this.active)) return;
        this.active = this.activeFromMatch();
    }

    renderTab = (tab: RouteTab) => {
        const { title, id, badge } = tab;
        return (
            <Link
                data-skip-focus-delegation
                key={id}
                class={{
                    tab: true,
                    drag_over: this.activeDragOver === id,
                }}
                part={`tab ${id} ${this.active === id ? 'active' : ''}`}
                ref={this.captureTab(id)}
                onDragEnter={this.dragEnterTab(tab)}
                onDragLeave={this.dragLeaveTab(tab)}
                onDrop={this.dropTab(tab)}
                onDragOver={this.dragOverTab}
                url={this.getUrl(tab)}
            >
                <c2-badge count={badge?.() ? 1 : 0} variant={'dot'}>
                    <span class={'elipsis'}>{title}</span>
                </c2-badge>
            </Link>
        );
    };

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()}>
                {this.tabs.map((tab, i) => (
                    <>
                        {i !== 0 && !!this.interTabIcon && (
                            <c2-icon
                                icon={this.interTabIcon}
                                part={'inter-tab-icon'}
                                size={this.interTabIconSize}
                                key={`${tab.id}-icon`}
                            />
                        )}
                        {this.renderTab(tab)}
                    </>
                ))}
                <slot />
                <div
                    role={'presentation'}
                    class={'indicator'}
                    ref={this.captureIndicatior}
                    part={'indicator'}
                />
            </Host>
        );
    }

    private getUrl = (tab: RouteTab) => tab.url ?? `/${tab.id}`;
    private activeFromMatch = () => {
        for (const tab of this.tabs) {
            const matches = router.match({
                path: this.getUrl(tab),
                exact: tab.exact,
            });
            if (matches) return tab.id;
        }
    };

    private tabRefs = new Map<string, HTMLElement>();
    private captureTab = (id: string) => (ref?: HTMLElement) => {
        if (ref) {
            this.tabRefs.set(id, ref);
            this.observer.observe(ref);

            if (!this.indicatorAttachedTo && id === this.active) {
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

    private indicatorAttachedTo?: string;
    private indicatorFrame!: ReturnType<typeof requestAnimationFrame>;

    @Watch('active') positionIndicator(active?: string, previous?: string) {
        if (!this.indicator) return;

        const previousTab = previous ? this.tabRefs.get(previous) : undefined;
        const tab = active ? this.tabRefs.get(active) : undefined;

        if (!active || !tab) {
            this.exitIndicator(this.indicator, previousTab);
        } else if (!this.indicatorAttachedTo) {
            this.enterIndicator(active, tab, this.indicator);
        } else {
            this.moveIndicator(active, tab, this.indicator);
        }
    }

    private exitIndicator = (
        indicator: HTMLElement,
        previousTab?: HTMLElement,
    ) => {
        indicator.style.setProperty(
            'transition-property',
            'width, transform, opacity',
        );
        indicator.addEventListener(
            'transitionend',
            () => {
                indicator.style.removeProperty('transition-property');
            },
            { once: true },
        );

        cancelAnimationFrame(this.indicatorFrame);
        this.indicatorFrame = requestAnimationFrame(() => {
            if (previousTab) {
                const { width } = getComputedStyle(previousTab);
                const left = previousTab.offsetLeft;
                indicator.style.transform = `translateX(calc(${left}px + calc(${width} / 2)))`;
            }

            indicator.style.opacity = '0';
            indicator.style.width = '0px';
            this.indicatorAttachedTo = undefined;
        });
    };

    private enterIndicator = (
        active: string,
        tab: HTMLElement,
        indicator: HTMLElement,
    ) => {
        const { width } = getComputedStyle(tab);
        const left = tab.offsetLeft;
        const transform = `translateX(calc(${left}px + calc(${width} / 2)))`;
        indicator.style.opacity = '0';
        indicator.style.width = '0px';
        indicator.style.transform = transform;

        cancelAnimationFrame(this.indicatorFrame);
        this.indicatorFrame = requestAnimationFrame(() => {
            this.moveIndicator(active, tab, indicator);
        });
    };

    private moveIndicator = (
        active: string,
        tab: HTMLElement,
        indicator: HTMLElement,
    ) => {
        if (this.indicatorAttachedTo !== active) {
            indicator.style.setProperty(
                'transition-property',
                'width, transform, opacity',
            );
            indicator.addEventListener(
                'transitionend',
                () => {
                    indicator.style.removeProperty('transition-property');
                },
                { once: true },
            );
        } else {
            indicator.style.removeProperty('transition-property');
        }

        cancelAnimationFrame(this.indicatorFrame);
        this.indicatorFrame = requestAnimationFrame(() => {
            const { width, paddingLeft, paddingRight } = getComputedStyle(tab);
            const left = tab.offsetLeft;
            indicator.style.width = `calc(${width} - ${paddingLeft} - ${paddingRight})`;
            indicator.style.transform = `translateX(calc(${left}px + ${paddingLeft}))`;
            indicator.style.opacity = '1';
            this.indicatorAttachedTo = active;
        });
    };

    private dragTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
    private dragCounts = new Map<string, number>();
    private dragEnterTab = (tab: RouteTab) => (e: DragEvent) => {
        e.preventDefault();

        const id = tab.id;
        const count = (this.dragCounts.get(id) ?? 0) + 1;
        this.dragCounts.set(id, count);

        if (this.dragTimeouts.has(id)) return;
        this.activeDragOver = id;
        this.dragTimeouts.set(
            id,
            setTimeout(() => {
                router.push(this.getUrl(tab));
            }, 1000),
        );
    };
    private dragLeaveTab =
        ({ id }: RouteTab) =>
        (e: DragEvent) => {
            e.preventDefault();
            const count = (this.dragCounts.get(id) ?? 1) - 1;
            this.dragCounts.set(id, count);
            if (count <= 0) {
                this.finishDrag(id);
            }
        };
    private dropTab =
        ({ id }: RouteTab) =>
        (e: DragEvent) => {
            e.preventDefault();
            this.finishDrag(id);
        };
    private dragOverTab = (e: DragEvent) => {
        e.preventDefault();
    };

    private finishDrag = (id: string) => {
        clearTimeout(this.dragTimeouts.get(id)!);
        this.dragTimeouts.delete(id);
        this.dragCounts.delete(id);
        if (this.activeDragOver === id) {
            this.activeDragOver = undefined;
        }
    };
}
