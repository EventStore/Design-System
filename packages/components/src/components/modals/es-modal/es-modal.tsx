import {
    Component,
    h,
    Host,
    Event,
    type EventEmitter,
    Prop,
    getElement,
    Listen,
} from '@stencil/core';
import { delegateFocus, trapFocus } from '@eventstore-ui/utils';
import { ICON_NAMESPACE } from '../../../icons/namespace';

/**
 * A pop up modal for overlaying information, warnings and confirmations.
 * Traps focus within the modal, and returns focus to previous location when closed.
 * Pair with an [`es-portal`](/components/components/es-portal) to open and close.
 * @part header - The modal header
 * @part body - The modal body
 * @part footer - The modal footer
 * @slot - Places components in the body.
 * @slot header - Places components in the header. Pass a h2 then a h1 for standard styling.
 * @slot footer - Places components in the footer. Pass es-button and es-button-link.
 */
@Component({
    tag: 'es-modal',
    styleUrl: 'es-modal.css',
    shadow: true,
})
export class Modal {
    /** Triggers when the modal requests to be closed. */
    @Event() requestClose!: EventEmitter<void>;

    /** If the modal should have a header. */
    @Prop() header: boolean = true;
    /** If the modal should have a footer. */
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
                    onClick={() => this.requestClose.emit()}
                    data-skip-focus-delegation
                >
                    <es-icon icon={[ICON_NAMESPACE, 'close']} size={22} />
                </button>
                {this.header && (
                    <header part={'header'}>
                        <slot name={'header'} />
                    </header>
                )}
                <div class={'body'} part={'body'}>
                    <slot />
                </div>
                {this.footer && (
                    <footer part={'footer'}>
                        <slot name={'footer'} />
                    </footer>
                )}
            </Host>
        );
    }
}
