import { Component, h, Prop, Watch, Element } from '@stencil/core';
import { delegateFocus } from '@kurrent-ui/utils';
import type { WizardPage } from './types';

const PAGES_REF = '__PAGES_REF__';

/**
 * A multi step wizard. Each step can be targeted via a slot.
 * @slot [tabName] - Slots are created based off of the names of the passed pages.
 */
@Component({
    tag: 'es-wizard',
    styleUrl: 'es-wizard.css',
    shadow: true,
})
export class Wizard {
    @Element() host!: HTMLEsWizardElement;

    /** A list of pages describing each step. */
    @Prop() pages!: WizardPage[];
    /** The currently active page */
    @Prop() location!: string;
    /** Offset the scroll to top on page change */
    @Prop() scrollOffset: number = 0;

    private index: number = 0;

    componentWillLoad() {
        this.updateIndex(this.location);
    }

    render() {
        return (
            <div
                class={'pages'}
                ref={this.capture(PAGES_REF)}
                onScroll={this.preventFocusShift}
            >
                {this.pages.map(({ id }, i) => (
                    <section
                        key={id}
                        ref={this.capture(id)}
                        class={{
                            page: true,
                            active: id === this.location,
                            passed: i < this.index,
                            future: i > this.index,
                        }}
                    >
                        <slot name={id} />
                    </section>
                ))}
            </div>
        );
    }

    private elements = new Map<string, HTMLElement>();
    private capture = (id: string) => (ref?: HTMLElement) => {
        if (ref) {
            this.elements.set(id, ref);
        } else {
            this.elements.delete(id);
        }
    };

    private preventFocusShift = () => {
        if (!this.elements.has(PAGES_REF)) return;
        this.elements.get(PAGES_REF)!.scrollTop = 0;
    };

    updateIndex(location: string) {
        this.index = this.pages.findIndex(({ id }) => id === location);
    }

    @Watch('location') animateHeight(newLocation: string) {
        const pages = this.elements.get(PAGES_REF);

        if (!pages) return;

        pages.classList.add('animating');
        this.updateIndex(newLocation);

        const currentHeight = pages.offsetHeight;
        const nextHeight = this.elements.get(newLocation)?.offsetHeight ?? 0;

        pages.style.setProperty('transition-property', 'none');
        pages.style.setProperty('min-height', `${currentHeight}px`);

        pages.addEventListener(
            'transitionend',
            () => {
                pages.style.removeProperty('transition-property');
                pages.style.removeProperty('min-height');
                pages.classList.remove('animating');
            },
            {
                once: true,
                passive: true,
            },
        );

        requestAnimationFrame(() => {
            pages.style.setProperty('transition-property', 'min-height');
            pages.style.setProperty('min-height', `${nextHeight}px`);

            if (this.elements.has(newLocation)) {
                delegateFocus(this.elements.get(newLocation)!, {
                    preventScroll: true,
                });
            }

            const top =
                this.host.getBoundingClientRect().top +
                window.scrollY +
                this.scrollOffset;

            window.scroll({
                behavior: 'smooth',
                top,
            });
        });
    }
}
