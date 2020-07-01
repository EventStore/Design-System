import {
    Component,
    h,
    Prop,
    Host,
    Event,
    EventEmitter,
    Watch,
    Element,
} from '@stencil/core';

export interface WizardPage {
    id: string;
    title: string;
    disabled?: true;
}

const PAGE_REF = '__PAGE_REF__';

@Component({
    tag: 'es-wizard',
    styleUrl: 'es-wizard.css',
    shadow: true,
})
export class Wizard {
    @Element() host!: HTMLEsWizardElement;
    @Event({ bubbles: true }) progressionRequest!: EventEmitter;

    @Prop() pages!: WizardPage[];
    @Prop() location!: string;

    private index: number = 0;

    componentWillLoad() {
        this.updateIndex(this.location);
    }

    @Watch('location') updateIndex(location: string) {
        this.index = this.pages.findIndex(({ id }) => id === location);
    }

    render() {
        return (
            <Host>
                <es-progression
                    checkpoints={this.pages}
                    location={this.location}
                />
                <div class={'pages'} ref={this.capture(PAGE_REF)}>
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
            </Host>
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

    @Watch('location') animateHeight(newLocation: string) {
        const page = this.elements.get(PAGE_REF);

        if (!page) return;

        const currentHeight = page.offsetHeight;
        const nextHeight = this.elements.get(newLocation)?.offsetHeight ?? 0;

        page.style.transitionProperty = 'none';
        page.style.minHeight = `${currentHeight}px`;

        requestAnimationFrame(() => {
            page.style.transitionProperty = 'min-height';
            page.style.minHeight = `${nextHeight}px`;

            window.scrollBy({
                behavior: 'smooth',
                top: this.host.getBoundingClientRect().top,
            });
        });
    }
}
