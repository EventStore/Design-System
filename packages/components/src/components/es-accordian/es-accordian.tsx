import { Component, h, Prop, Host, State, Watch, Listen } from '@stencil/core';
import { findAssignedSlot } from '@eventstore/utils';

export type SectionVariant = 'default' | 'mega' | 'field' | 'text' | 'footer';

export interface Section {
    name: string;
    variant?: SectionVariant;
    title?: string;
    collapsable?: boolean;
    defaultCollapsed?: boolean;
}

@Component({
    tag: 'es-accordian',
    styleUrl: 'es-accordian.css',
    shadow: true,
})
export class Accordian {
    @Prop() sections!: Section[];

    @State() collapsed: Set<string> = new Set();

    private collapseEls: Map<string, HTMLDivElement> = new Map();

    componentWillLoad() {
        this.updateCollapsed(this.sections);
    }

    @Listen('focusin') handleFocusIn(e: FocusEvent) {
        const target = e.target as HTMLElement;
        const slot = findAssignedSlot(target)?.name;

        if (slot && this.collapsed.has(slot)) {
            this.expandSection(slot);
        }
    }

    @Watch('sections')
    updateCollapsed(sections: Section[]) {
        const collapsed = new Set<string>();
        for (const {
            name,
            collapsable = false,
            defaultCollapsed = false,
        } of sections) {
            if (collapsable && defaultCollapsed) {
                collapsed.add(name);
            }
        }
        this.collapsed = collapsed;
    }

    render() {
        return (
            <Host>
                {this.sections.map(
                    ({
                        name,
                        title,
                        collapsable = false,
                        variant = 'default',
                    }) => {
                        const collapsed = this.collapsed.has(name);

                        return (
                            <section
                                key={name}
                                id={name}
                                class={{
                                    collapsed,
                                    [variant]: variant !== 'default',
                                }}
                            >
                                {!!title && (
                                    <header
                                        id={`${name}-title`}
                                        class={{
                                            ['section_header']: true,
                                            collapsable,
                                            collapsed: this.collapsed.has(name),
                                        }}
                                        onClick={this.toggle(name, collapsable)}
                                        role={
                                            collapsable ? 'button' : undefined
                                        }
                                        aria-controls={
                                            collapsable
                                                ? `#${name}-content`
                                                : undefined
                                        }
                                        aria-expanded={`${!collapsed}`}
                                    >
                                        <h1>{title}</h1>
                                        {collapsable && (
                                            <es-icon
                                                icon={'chevron'}
                                                size={14}
                                            />
                                        )}
                                    </header>
                                )}
                                <div
                                    class={'section_content'}
                                    id={`${name}-content`}
                                    key={`${name}-content`}
                                    aria-hidden={`${collapsed}`}
                                    ref={this.captureElement(name)}
                                >
                                    <div class={'section_content_inner'}>
                                        <slot name={name} />
                                    </div>
                                </div>
                            </section>
                        );
                    },
                )}
            </Host>
        );
    }

    private captureElement = (name: string) => (ref?: HTMLDivElement) => {
        if (ref) {
            this.collapseEls.set(name, ref);
        } else {
            this.collapseEls.delete(name);
        }
    };

    private collapseSection = (name: string) => {
        if (!this.collapseEls.has(name)) return;

        const element = this.collapseEls.get(name)!;

        const height = element.scrollHeight;
        element.style.height = `${height}px`;
        element.style.opacity = '1';

        requestAnimationFrame(() => {
            element.style.transitionProperty = 'opacity height';
            element.style.height = '0px';
            element.style.opacity = '0';
        });

        const collapsed = new Set(this.collapsed);
        collapsed.add(name);
        this.collapsed = collapsed;
    };

    private expandSection = (name: string) => {
        if (!this.collapseEls.has(name)) return;

        const element = this.collapseEls.get(name)!;

        // prevent focusing from messing with the scrolltop
        element.scrollTop = 0;

        const transitionEnd = () => {
            if (!this.collapsed.has(name)) {
                element.style.height = 'auto';
            }
            element.removeEventListener('transitionend', transitionEnd);
        };

        element.addEventListener('transitionend', transitionEnd);

        const height = element.scrollHeight;
        element.style.height = '0px';
        element.style.opacity = '0';
        element.style.transitionProperty = 'opacity height';
        element.style.height = `${height}px`;
        element.style.opacity = '1';

        const collapsed = new Set(this.collapsed);
        collapsed.delete(name);
        this.collapsed = collapsed;
    };

    private toggleAll = (expand: boolean) => {
        this.sections.forEach(({ name, collapsable }) => {
            if (!collapsable) return;
            if (expand) {
                this.expandSection(name);
            } else {
                this.collapseSection(name);
            }
        });
    };

    private toggle = (name: string, collapsable: boolean) => (
        e: MouseEvent,
    ) => {
        e.preventDefault();

        if (!collapsable) return;

        const expand = this.collapsed.has(name);

        if (e.altKey) {
            this.toggleAll(expand);
        } else if (expand) {
            this.expandSection(name);
        } else {
            this.collapseSection(name);
        }
    };
}
