import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Element,
    Host,
} from '@stencil/core';

import { ValidationMessages, FieldChangeEvent } from '../../types';

@Component({
    tag: 'es-input-list',
    styleUrl: 'es-input-list.css',
    shadow: true,
})
export class InputList {
    @Element() host!: HTMLEsListCreatorElement;
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop() label!: string;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;
    @Prop() name!: string;
    @Prop() value!: string[];
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() additionText: string = 'Add item';

    renderInput = (value: string, i: number) => (
        <es-input
            label={this.label}
            name={`${this.name}-${i}`}
            placeholder={this.placeholder}
            value={value}
            onFieldchange={this.subFieldChange(i)}
            invalid={this.invalid}
            disabled={this.disabled}
        >
            <es-button
                class={'delete_item'}
                variant={'outline'}
                color={'secondary'}
                onClick={this.onDelete(i)}
            >
                <es-icon icon={'trash'} size={20} />
            </es-button>
        </es-input>
    );

    render() {
        return (
            <Host>
                {!this.value.length
                    ? this.renderInput('', 0)
                    : this.value.map(this.renderInput)}

                {!this.disabled && (
                    <div class={'row'}>
                        <es-button
                            onClick={this.onAdd}
                            variant={'minimal'}
                            class={'add_item'}
                        >
                            {this.additionText}
                            <es-icon icon={'plus'} slot={'after'} size={20} />
                        </es-button>
                    </div>
                )}
                <div class={'row'}>
                    <es-validation-messages messages={this.messages} />
                </div>
            </Host>
        );
    }

    private onAdd = () => {
        this.fieldchange.emit({
            name: this.name,
            value: this.value.length === 0 ? ['', ''] : [...this.value, ''],
        });
    };

    private onDelete = (i: number) => () => {
        const value = [...this.value];
        value.splice(i, 1);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };

    private subFieldChange = (i: number) => (
        e: FieldChangeEvent<Record<string, string>>,
    ) => {
        e.stopPropagation();

        const value = [...this.value];

        if (i === this.value.length) {
            value.push('');
        }

        value[i] = e.detail.value;

        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
