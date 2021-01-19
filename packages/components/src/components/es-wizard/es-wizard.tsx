import { Component, h, Prop, Watch, Element } from '@stencil/core';
import { delegateFocus } from '@eventstore/utils';
import type { WizardPage } from './types';

const PAGE_REF = '__PAGE_REF__';

@Component({
    tag: 'es-wizard',
    styleUrl: 'es-wizard.css',
    shadow: true,
})
export class Wizard {
    @Element() host!: HTMLEsWizardElement;

    @Prop() pages!: WizardPage[];
    @Prop() location!: string;
    @Prop() scrollOffset: number = 0;

    private index: number = 0;

    componentWillLoad() {
        this.updateIndex(this.location);
    }

    @Watch('location') updateIndex(location: string) {
        this.index = this.pages.findIndex(({ id }) => id === location);
    }

    render() {
        return (
            <div
                class={'pages'}
                ref={this.capture(PAGE_REF)}
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
        if (!this.elements.has(PAGE_REF)) return;
        this.elements.get(PAGE_REF)!.scrollTop = 0;
    };

    @Watch('location') animateHeight(newLocation: string) {
        const page = this.elements.get(PAGE_REF);

        if (!page) return;

        const currentHeight = page.offsetHeight;
        const nextHeight = this.elements.get(newLocation)?.offsetHeight ?? 0;

        page.style.setProperty('transition-property', 'none');
        page.style.setProperty('min-height', `${currentHeight}px`);

        page.addEventListener(
            'transitionend',
            () => {
                page.style.removeProperty('transition-property');
                page.style.removeProperty('min-height');
            },
            {
                once: true,
                passive: true,
            },
        );

        requestAnimationFrame(() => {
            page.style.setProperty('transition-property', 'min-height');
            page.style.setProperty('min-height', `${nextHeight}px`);

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
