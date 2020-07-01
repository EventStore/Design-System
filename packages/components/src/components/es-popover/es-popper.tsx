import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'es-popper',
    styleUrl: 'es-popper.css',
    shadow: true,
})
export class Popper {
    @Event() requestClose!: EventEmitter;
    @Prop() backdrop: boolean = false;

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
