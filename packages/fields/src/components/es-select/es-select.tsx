import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Element,
    VNode,
} from '@stencil/core';
import { ValidationMessages, FieldChangeEvent } from '../../types';
import { Field } from '../Field/Field';
import {
    RenderTypeaheadField,
    TypeaheadOption,
    OptionFilter,
    RenderTypeaheadOption,
} from '../es-typeahead/types';

export type RenderSelectValue = (
    value: TypeaheadOption | undefined,
    rawValue: string,
) => VNode | string;

@Component({
    tag: 'es-select',
    styleUrl: 'es-select.css',
    shadow: {
        delegatesFocus: true,
    },
})
export class EsSelect {
    @Element() host!: HTMLEsListCreatorElement;

    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop() label!: string;
    @Prop() name!: string;
    @Prop() value!: string | null;

    @Prop() options!: TypeaheadOption[];
    @Prop() renderOption?: RenderTypeaheadOption;
    @Prop() renderValue: RenderSelectValue = (o, v) => o?.name ?? v;
    @Prop() optionFilter?: OptionFilter;
    @Prop() placeholder?: string;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;

    renderPlaceholder = () => (
        <span class={'placeholder'}>{this.placeholder}</span>
    );

    renderField: RenderTypeaheadField = ({ Input, open, filter }) => (
        <div class={{ input: true, open, disabled: !!this.disabled }}>
            <Input class={'true_input'} />
            {!open || !filter
                ? this.value
                    ? this.renderValue(this.findOption(this.value), this.value)
                    : this.renderPlaceholder()
                : null}
            <es-icon icon={'chevron'} size={14} />
        </div>
    );

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <es-typeahead
                    name={`${this.name}-typeahead`}
                    value={this.value ? [this.value] : []}
                    closeOnSelect
                    renderField={this.renderField}
                    renderOption={this.renderOption}
                    options={this.options}
                    optionFilter={this.optionFilter}
                    onFieldchange={this.onTypeaheadChange}
                    disabled={this.disabled}
                />
                <slot />
            </Field>
        );
    }

    private findOption = (value: string) => {
        return this.options.find((o) => o.value === value);
    };

    private onTypeaheadChange = (
        e: FieldChangeEvent<{ typeahead: string[] }>,
    ) => {
        e.stopPropagation();

        const { value } = e.detail;

        this.fieldchange.emit({
            name: this.name,
            value: value.pop() ?? null,
        });
    };
}
