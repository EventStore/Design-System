import { Component, h, State, Prop } from '@stencil/core';

import type { IconDescription } from '../../icon/types';
import { ICON_NAMESPACE } from '../../../icons/namespace';

export type Status = 'default' | 'thinking' | 'complete' | 'failed';

/** A button with an icon that displays the state of a async action on click. */
@Component({
    tag: 'c2-thinking-button',
    styleUrl: 'thinking-button.css',
    shadow: true,
})
export class YThinkingButton {
    /** The async action to be called on click. */
    @Prop() action!: (e: MouseEvent) => Promise<unknown>;
    /** Optional text of the button */
    @Prop() text?: string;
    /** Which styling variant to use. */
    @Prop() variant: HTMLC2ButtonElement['variant'] = 'default';
    /** If the button is disabled. Prevents the user from interacting with the button: it cannot be pressed or focused. */
    @Prop() disabled?: boolean;

    /** The default icon to display when nothing is happening. */
    @Prop() defaultIcon!: IconDescription;
    /** The icon to display when we are awaiting the action. */
    @Prop() thinkingIcon: IconDescription = [ICON_NAMESPACE, 'spinner'];
    /** The icon to display when the action completed successfully. */
    @Prop() completeIcon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** The icon to display when the action errored out. */
    @Prop() failedIcon: IconDescription = [ICON_NAMESPACE, 'error'];

    @State() status: Status = 'default';

    disconnectedCallback() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <c2-button
                variant={this.variant}
                onClick={this.execute}
                disabled={this.disabled}
            >
                {this.text}
                <c2-icon
                    slot={this.text ? 'after' : undefined}
                    class={this.status}
                    icon={this.iconName(this.status)}
                />
            </c2-button>
        );
    }

    private iconName = (status: Status) => {
        switch (status) {
            case 'thinking':
                return this.thinkingIcon;
            case 'complete':
                return this.completeIcon;
            case 'failed':
                return this.failedIcon;
            default:
                return this.defaultIcon;
        }
    };

    private timeout!: ReturnType<typeof setTimeout>;
    private execute = async (e: MouseEvent) => {
        clearTimeout(this.timeout);
        this.status = 'thinking';

        try {
            await this.action(e);
            this.status = 'complete';
        } catch (error) {
            this.status = 'failed';
        }

        this.timeout = setTimeout(() => {
            this.status = 'default';
        }, 2000);
    };
}
