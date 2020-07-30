import { Component, h, State, Method, Host } from '@stencil/core';

export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

@Component({
    tag: 'es-popper-inner',
    styleUrl: 'es-popper-inner.css',
    shadow: true,
})
export class Popper {
    @State() position: Position = {};

    @Method() async setPosition(position: Position) {
        this.position = position;
    }

    render() {
        return (
            <Host
                style={{
                    top:
                        this.position.top != null
                            ? `${this.position.top}px`
                            : 'auto',
                    right:
                        this.position.right != null
                            ? `${this.position.right}px`
                            : 'auto',
                    bottom:
                        this.position.bottom != null
                            ? `${this.position.bottom}px`
                            : 'auto',
                    left:
                        this.position.left != null
                            ? `${this.position.left}px`
                            : 'auto',
                }}
            >
                <slot />
            </Host>
        );
    }
}
