import { Component, h, Prop, Host, State, Watch, Listen } from '@stencil/core';
import { findAssignedSlot } from '@eventstore-ui/utils';
import type { AccordianSection } from './types';
import { ICON_NAMESPACE } from '../../icons/namespace';

/**
 * Optionally collapsible sectioned view. Each section can be targeted via a part.
 * @slot [sectionName] - Slots are created based off of the names of the passed sections.
 * @part section - Target the outer section.
 * @part [sectionName] - Target the outer section by name.
 * @part section_header - Target the header of each section.
 * @part section_header_title - Target the header text of each section.
 * @part section_header_icon - Target the collapse icon of each section (if collapseable).
 * @part section_content - Target the content wrapper of each section.
 * @part section_content_inner - Target the content of each section.
 */
@Component({
    tag: 'es-accordian',
    styleUrl: 'es-accordian.css',
    shadow: true,
})
export class Accordian {
    /** An array of sections to display. */
    @Prop() sections!: AccordianSection[];
    /** Display numbered counters beside each title. */
    @Prop() steps = false;

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
    updateCollapsed(sections: AccordianSection[]) {
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
                    (
                        {
                            name,
                            title,
                            collapsable = false,
                            variant = 'default',
                        },
                        i,
                    ) => {
                        const collapsed = this.collapsed.has(name);

                        return (
                            <section
                                key={name}
                                id={name}
                                part={`section ${name}`}
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
                                        part={'section_header'}
                                    >
                                        <h1 part={'section_header_title'}>
                                            {this.steps && (
                                                <es-counter
                                                    variant={'outline'}
                                                    count={i + 1}
                                                    class={'step'}
                                                />
                                            )}
                                            {title}
                                        </h1>
                                        {collapsable && (
                                            <es-icon
                                                part={'section_header_icon'}
                                                icon={[
                                                    ICON_NAMESPACE,
                                                    'chevron',
                                                ]}
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
                                    part={'section_content'}
                                >
                                    <div
                                        class={'section_content_inner'}
                                        part={'section_content_inner'}
                                    >
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
