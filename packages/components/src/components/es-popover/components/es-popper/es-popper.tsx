import {
    Component,
    Event,
    EventEmitter,
    getElement,
    h,
    Host,
    Listen,
    Method,
    Prop,
} from '@stencil/core';
import { delegateFocus, trapFocus } from '@eventstore-ui/utils';

/** @internal */
@Component({
    tag: 'es-popper',
    styleUrl: 'es-popper.css',
    shadow: true,
})
export class Popper {
    @Event() requestClose!: EventEmitter;
    @Prop() backdrop: boolean = false;
    @Prop({ attribute: 'trap-focus' }) trapFocus: boolean = false;

    private releaseFocus?: () => void;
    private loadedPromise!: Promise<void>;
    private hasLoaded!: () => void;

    @Method()
    async loaded() {
        await this.loadedPromise;
        return true;
    }

    componentWillLoad() {
        this.loadedPromise = new Promise((resolve) => {
            this.hasLoaded = resolve;
        });
    }

    componentDidLoad() {
        this.hasLoaded();
        if (!this.trapFocus) return;
        delegateFocus(getElement(this));
    }

    connectedCallback() {
        if (!this.trapFocus) return;
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
                {this.backdrop && (
                    <div onClick={this.onClickBackdrop} class={'backdrop'} />
                )}
                <slot />
            </Host>
        );
    }

    private onClickBackdrop = () => {
        this.requestClose.emit();
    };
}
