import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    State,
    Host,
    Element,
    Watch,
    VNode,
} from '@stencil/core';

import { ValidationMessages, FieldChangeEvent } from '../../types';
import { RenderTypeaheadField, TypeaheadOption } from '../es-typeahead/types';
import { Field } from '../Field/Field';

@Component({
    tag: 'es-list-creator',
    styleUrl: 'es-list-creator.css',
    shadow: true,
})
export class ListCreator {
    @Element() host!: HTMLEsListCreatorElement;
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop() label!: string;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;
    @Prop() name!: string;
    @Prop() value!: string[];
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() icon!: string;
    @Prop() options!: TypeaheadOption[];
    @Prop() renderItem = ({ name }: TypeaheadOption): VNode => (
        <input readonly class={'input'} value={name} tabindex={-1} />
    );

    @State() invalidInput: boolean = false;
    @State() remainingOptions: TypeaheadOption[] = [];
    @State() expandedValues: TypeaheadOption[] = [];

    componentWillLoad() {
        this.updateOptions();
    }

    @Watch('value')
    @Watch('options')
    updateOptions() {
        const { value: values, options } = this;

        this.remainingOptions = options.filter(
            ({ value }) => !values.includes(value),
        );
        this.expandedValues = values
            .map((value) => this.options.find((o) => o.value == value)!)
            .filter(Boolean);
    }

    renderField: RenderTypeaheadField = ({ Input, open }) => (
        <Input class={{ input: true, open }} placeholder={this.placeholder} />
    );

    render() {
        return (
            <Host>
                <Field
                    label={this.label}
                    messages={this.messages}
                    invalid={this.invalid}
                >
                    <es-typeahead
                        clearOnSelect
                        name={`${this.name}-typeahead`}
                        value={this.value}
                        options={this.remainingOptions}
                        renderField={this.renderField}
                        onFieldchange={this.onTypeaheadChange}
                    />
                    <es-button
                        class={'create'}
                        variant={'outline'}
                        color={'secondary'}
                        tabIndex={-1}
                    >
                        <es-icon icon={'plus'} size={20} />
                    </es-button>
                </Field>
                {!!this.value.length && (
                    <ul class={'value_list'} part={'value-list'}>
                        {this.expandedValues.map((value) => (
                            <li
                                key={value.value}
                                class={'value_list_item'}
                                part={'value-list-item'}
                            >
                                <es-icon
                                    icon={this.icon}
                                    class={'value_list_item_icon'}
                                />
                                {this.renderItem(value)}
                                <es-button
                                    class={'value_list_item_delete'}
                                    variant={'outline'}
                                    color={'secondary'}
                                    onClick={this.onDelete(value)}
                                >
                                    <es-icon icon={'trash'} size={20} />
                                </es-button>
                            </li>
                        ))}
                    </ul>
                )}
            </Host>
        );
    }

    private onDelete = ({ value }: TypeaheadOption) => () => {
        this.fieldchange.emit({
            name: this.name,
            value: this.value.filter((v) => v !== value),
        });
    };

    private onTypeaheadChange = (
        e: FieldChangeEvent<{ typeahead: string[] }>,
    ) => {
        e.stopPropagation();

        this.fieldchange.emit({
            name: this.name,
            value: e.detail.value,
        });
    };
}
