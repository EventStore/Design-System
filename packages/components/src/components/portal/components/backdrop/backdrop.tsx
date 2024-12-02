import {
    Component,
    Event,
    type EventEmitter,
    h,
    Host,
    Prop,
    Method,
    State,
} from '@stencil/core';
import type { RenderFunction } from '../../../../types';

export type BackdropState = 'mounting' | 'entering' | 'entered' | 'exiting';

/** @internal */
@Component({
    tag: 'c2-backdrop',
    styleUrl: 'backdrop.css',
    shadow: true,
})
export class Backdrop {
    @Event() requestClose!: EventEmitter;
    @Event() closed!: EventEmitter;

    @Prop() showBackdrop: boolean = false;
    @Prop({ reflect: true }) preventOverscroll: boolean = false;

    @State() child: ReturnType<RenderFunction> = null;
    @State() state: BackdropState = 'mounting';

    @Method() async renderNode(node: RenderFunction) {
        this.child = node(h);
    }

    private resolveClose?: (closed: boolean) => void;

    @Method() async close() {
        const closed = await new Promise<boolean>((resolve) => {
            this.resolveClose = resolve;
            this.state = 'exiting';
        });
        delete this.resolveClose;
        return closed;
    }

    @Method() async cancelClose() {
        if (this.state !== 'exiting') return;
        this.resolveClose?.(false);
        this.state = 'entering';
    }

    componentDidLoad() {
        requestAnimationFrame(() => {
            this.state = 'entering';
        });
    }

    render() {
        return (
            <Host
                onTransitionEnd={this.onTransitionEnd}
                class={this.state as string}
                style={{
                    opacity:
                        this.state === 'mounting' || this.state === 'exiting'
                            ? '0'
                            : '1',
                }}
            >
                {this.showBackdrop && (
                    <div onClick={this.onClickBackdrop} class={'backdrop'} />
                )}
                {this.child}
            </Host>
        );
    }

    private onTransitionEnd = () => {
        switch (this.state) {
            case 'entering': {
                this.state = 'entered';
                break;
            }
            case 'exiting': {
                this.resolveClose?.(true);
                break;
            }
        }
    };

    private onClickBackdrop = () => {
        this.requestClose.emit();
    };
}
