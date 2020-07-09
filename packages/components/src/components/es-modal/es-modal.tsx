import { Component, h, Host, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'es-modal',
    styleUrl: 'es-modal.css',
    shadow: true,
})
export class Modal {
    @Event() requestClose!: EventEmitter;
    @Prop() header: boolean = true;
    @Prop() footer: boolean = true;

    render() {
        return (
            <Host>
                <button
                    class={'close'}
                    role={'button'}
                    onClick={this.requestClose.emit}
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
