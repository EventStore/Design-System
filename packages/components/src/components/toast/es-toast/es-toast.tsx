import {
    Component,
    h,
    Element,
    Prop,
    Host,
    State,
    Method,
} from '@stencil/core';
import { theme } from '@eventstore/theme';
import type { ToastLevel, Toast } from '../types';

/** @internal */
@Component({
    tag: 'es-toast',
    styleUrl: 'es-toast.css',
    shadow: true,
})
export class EsToast {
    @Element() host!: HTMLEsToastElement;

    @Prop() level!: ToastLevel;
    @Prop() count!: Toast['count'];
    @Prop() icon!: Toast['icon'];

    @State() transitionState: string = 'mounting';

    @Method() async close() {
        return new Promise<void>((resolve) => {
            const hasLeft = () => {
                this.host.removeEventListener('transitionend', hasLeft);
                resolve();
            };
            this.host.addEventListener('transitionend', hasLeft);
            this.transitionState = 'unmounting';
        });
    }

    componentDidLoad() {
        requestAnimationFrame(this.enter);
    }

    render() {
        return (
            <Host
                class={`${this.level} ${this.transitionState}`}
                high-contrast={theme.isHighContrast()}
                dark={theme.isDark()}
            >
                <div class={'inner'}>
                    <div class={'icon_holder'}>
                        {this.count > 1 ? (
                            <es-counter
                                count={this.count}
                                variant={'minimal'}
                            />
                        ) : (
                            <es-icon icon={this.icon} size={20} />
                        )}
                    </div>
                    <div class={'content'}>
                        <slot />
                    </div>
                </div>
            </Host>
        );
    }

    private enter = () => {
        this.transitionState = 'mounted';
    };
}
