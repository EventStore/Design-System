import {
    Component,
    h,
    Element,
    Prop,
    Host,
    State,
    Method,
} from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import type { ToastLevel, Toast } from '../types';

/** @internal */
@Component({
    tag: 'c2-toast',
    styleUrl: 'toast.css',
    shadow: true,
})
export class EsToast {
    @Element() host!: HTMLC2ToastElement;

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
                            <c2-counter
                                size={38}
                                count={this.count}
                                variant={'minimal'}
                            />
                        ) : (
                            <c2-icon icon={this.icon} size={22} />
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
