import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Method,
    State,
} from '@stencil/core';

@Component({
    tag: 'es-switch',
    styleUrl: 'es-switch.css',
    shadow: true,
})
export class EsSwitch {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() name!: string;
    @Prop() value!: boolean;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;

    @State() pending: boolean = false;

    @Method() async setPending(pending: boolean) {
        this.pending = pending;
    }

    render() {
        return (
            <button
                class={{
                    field: true,
                    invalid: !!this.invalid,
                    checked: this.value,
                }}
                tabIndex={0}
                onKeyDown={this.keyDown}
                onClick={this.onClick}
                disabled={this.disabled}
            >
                <svg
                    xmlns={'http://www.w3.org/2000/svg'}
                    width={45}
                    height={16}
                    viewBox={'0 0 45 16'}
                    class={'switch'}
                >
                    <line
                        class={'track'}
                        x1={4}
                        x2={41}
                        y1={8}
                        y2={8}
                        stroke-linecap={'round'}
                    />
                    <circle class={'handle'} cx={8} cy={8} r={8} />
                </svg>
            </button>
        );
    }

    private keyDown = (e: KeyboardEvent) => {
        if (this.disabled || this.pending) return;
        if (e.key === ' ' || e.key === 'Enter') {
            this.fieldchange.emit({
                name: this.name,
                value: !this.value,
            });
        }
    };

    private onClick = () => {
        if (this.disabled || this.pending) return;
        this.fieldchange.emit({
            name: this.name,
            value: !this.value,
        });
    };
}
