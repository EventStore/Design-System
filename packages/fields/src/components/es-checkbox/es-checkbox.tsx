import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'es-checkbox',
    styleUrl: 'es-checkbox.css',
    shadow: {
        delegatesFocus: true,
    },
})
export class EsCheckbox {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() name!: string;
    @Prop() value!: boolean;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;

    render() {
        return (
            <label class={{ field: true, invalid: !!this.invalid }}>
                <input
                    class={'input'}
                    type={'checkbox'}
                    onChange={this.onChange}
                    disabled={this.disabled}
                    readonly={this.readonly}
                />
                <es-icon icon={'check'} class={'checkbox'} size={12} />
                <span class={'label'}>
                    <slot />
                </span>
            </label>
        );
    }

    private onChange = (e: any) => {
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.checked,
        });
    };
}
