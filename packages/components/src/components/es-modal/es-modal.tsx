import { Component, h, Host, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'es-modal',
    styleUrl: 'es-modal.css',
    shadow: true,
})
export class Modal {
    @Event() requestClose!: EventEmitter;

    render() {
        return (
            <Host>
                <header>
                    <slot name={'header'} />
                    <button
                        class={'close'}
                        role={'button'}
                        onClick={this.requestClose.emit}
                    >
                        <es-icon icon={'close'} size={22} />
                    </button>
                </header>
                <slot />
                <footer>
                    <slot name={'footer'} />
                </footer>
            </Host>
        );
    }
}
