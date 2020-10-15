import { delegateFocus, trapFocus } from '@eventstore/utils';
import {
    Component,
    h,
    Host,
    Event,
    EventEmitter,
    Prop,
    getElement,
    Listen,
} from '@stencil/core';

@Component({
    tag: 'es-modal',
    styleUrl: 'es-modal.css',
    shadow: true,
})
export class Modal {
    @Event() requestClose!: EventEmitter;
    @Prop() header: boolean = true;
    @Prop() footer: boolean = true;

    private releaseFocus?: () => void;

    componentDidLoad() {
        delegateFocus(getElement(this));
    }

    connectedCallback() {
        this.releaseFocus = trapFocus(getElement(this));
    }

    disconnectedCallback() {
        this.releaseFocus?.();
    }

    @Listen('keyup') onEscape(e: KeyboardEvent) {
        if (e.key !== 'Escape') return;
        this.requestClose.emit();
    }

    render() {
        return (
            <Host>
                <button
                    class={'close'}
                    role={'button'}
                    onClick={this.requestClose.emit}
                    data-skip-focus-delegation
                >
                    <es-icon icon={'close'} size={22} />
                </button>
                {this.header && (
                    <header>
                        <slot name={'header'} />
                    </header>
                )}
                <div class={'body'}>
                    <slot />
                </div>
                {this.footer && (
                    <footer>
                        <slot name={'footer'} />
                    </footer>
                )}
            </Host>
        );
    }
}
