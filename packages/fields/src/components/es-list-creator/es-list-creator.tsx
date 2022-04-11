import type { IconDescription } from '@eventstore/components';
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

import type {
    FieldChange,
    FieldChangeEvent,
    ValidationMessages,
} from '../../types';
import type {
    RenderTypeaheadField,
    TypeaheadOption,
} from '../es-typeahead/types';
import { ES_FIELDS } from '../../icons/namespace';
import { Field } from '../Field/Field';

/**
 * A list creator input.
 * @part value-list - Target the ul containing the list items.
 * @part value-list-item - Target the li containing the option,
 **/
@Component({
    tag: 'es-list-creator',
    styleUrl: 'es-list-creator.css',
    shadow: true,
})
export class ListCreator {
    @Element() host!: HTMLEsListCreatorElement;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string[]>>;

    /** The label of the field. */
    @Prop() label!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** The icon to display next to the field */
    @Prop() icon?: IconDescription;
    /** The icon to display next to the field */
    @Prop() addIcon: IconDescription = [ES_FIELDS, 'plus'];
    /** Icon for the delete button. */
    @Prop() deleteIcon: IconDescription = [ES_FIELDS, 'trash'];
    /** A list of options to choose from. */
    @Prop() options!: TypeaheadOption[];
    /** The name of the field. */
    @Prop() name!: string;
    /** The selected item ids */
    @Prop() value!: string[];
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;

    /** Render the list item. */
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
        const options = this.options;
        const values = this.value;

        this.remainingOptions = options.filter(
            ({ value }) => !values.includes(value),
        );
        this.expandedValues = values
            .map((value) => this.options.find((o) => o.value === value)!)
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
                    invalid={!!this.messages?.error.length}
                >
                    <es-typeahead
                        clearOnSelect
                        name={this.name}
                        value={this.value}
                        options={this.remainingOptions}
                        renderField={this.renderField}
                        onFieldchange={this.onTypeaheadChange}
                    />
                </Field>
                {!!this.value.length && (
                    <ul class={'value_list'} part={'value-list'}>
                        {this.expandedValues.map((value, i) => (
                            <li
                                key={value.value}
                                class={'value_list_item'}
                                part={'value-list-item'}
                            >
                                {!!this.icon && (
                                    <es-icon
                                        icon={this.icon}
                                        class={'value_list_item_icon'}
                                    />
                                )}
                                {this.renderItem(value)}
                                <es-button
                                    class={'value_list_item_delete'}
                                    variant={'minimal'}
                                    onClick={this.onDelete(i)}
                                >
                                    <es-icon icon={this.deleteIcon} size={20} />
                                </es-button>
                            </li>
                        ))}
                    </ul>
                )}
            </Host>
        );
    }

    private onTypeaheadChange = (e: FieldChangeEvent<string[]>) => {
        e.stopImmediatePropagation();
        this.fieldchange.emit({
            name: this.name,
            value: e.detail.value,
        });
    };

    private onDelete = (i: number) => () => {
        this.fieldchange.emit({
            name: this.name,
            value: [...this.value.slice(0, i), ...this.value.slice(i + 1)],
        });
    };
}
