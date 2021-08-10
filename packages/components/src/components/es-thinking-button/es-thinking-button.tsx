import { Component, h, State, Prop } from '@stencil/core';

export type Status = 'default' | 'thinking' | 'complete' | 'failed';

@Component({
    tag: 'es-thinking-button',
    styleUrl: 'es-thinking-button.css',
    shadow: true,
})
export class YThinkingButton {
    @Prop() action!: (e: MouseEvent) => Promise<unknown>;
    @Prop() text?: string;
    @Prop() variant: HTMLEsButtonElement['variant'] = 'minimal';
    @Prop() color?: HTMLEsButtonElement['color'];
    @Prop() disabled?: boolean;

    @Prop() defaultIcon!: string;
    @Prop() thinkingIcon: string = 'spinner';
    @Prop() completeIcon: string = 'check';
    @Prop() failedIcon: string = 'error';

    @State() status: Status = 'default';

    disconnectedCallback() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <es-button
                color={this.color}
                variant={this.variant}
                onClick={this.execute}
                disabled={this.disabled}
            >
                {this.text}
                <es-icon
                    slot={this.text ? 'after' : undefined}
                    class={this.status}
                    icon={this.iconName(this.status)}
                />
            </es-button>
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
