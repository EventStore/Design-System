import {
    Component,
    h,
    Host,
    Listen,
    Element,
    Method,
    State,
} from '@stencil/core';
import type { IconDescription } from '../../components/es-icon/types';
import { ICON_NAMESPACE } from '../../icons/namespace';

export type Status = 'default' | 'thinking' | 'copied' | 'failed';

/** Copies the text passed as a child when clicked. */
@Component({
    tag: 'es-copy',
    styleUrl: 'es-copy.css',
    shadow: true,
})
export class EsCopy {
    @Element() host!: HTMLEsCopyElement;
    @State() status: Status = 'default';

    @Listen('click') onClick() {
        this.copyText();
    }

    /** Manually triggers the copy of the inner text. */
    @Method() async copy() {
        await this.copyText();
    }

    disconnectedCallback() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <Host
                class={{
                    copied: this.status === 'copied',
                    failed: this.status === 'failed',
                }}
            >
                <span>
                    <slot />
                </span>
                <es-icon icon={this.iconName[this.status]} size={14} />
            </Host>
        );
    }

    private iconName: Record<Status, IconDescription> = {
        default: [ICON_NAMESPACE, 'copy'],
        thinking: [ICON_NAMESPACE, 'spinner'],
        copied: [ICON_NAMESPACE, 'check'],
        failed: [ICON_NAMESPACE, 'error'],
    };

    private timeout!: ReturnType<typeof setTimeout>;
    private copyText = async () => {
        clearTimeout(this.timeout);
        this.status = 'thinking';

        try {
            await navigator.clipboard.writeText(this.host.innerText);
            this.status = 'copied';
        } catch (error) {
            this.status = 'failed';
        }

        this.timeout = setTimeout(() => {
            this.status = 'default';
        }, 2000);
    };
}
