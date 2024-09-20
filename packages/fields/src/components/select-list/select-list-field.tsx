import {
    Component,
    h,
    Prop,
    State,
    Element,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from 'icons/namespace';
import type {
    FieldChange,
    RenderFunction,
    ValidationMessages,
    Templated,
} from 'types';
import type {
    RenderTypeaheadInput,
    TypeaheadOption,
} from 'components/typeahead/types';
import { Field } from 'components/Field';

/**
 * Create a list from a fixed set of values.
 * @part input - The wrapping div of the select input.
 * @part true_input - The input element.
 * @part value-list - Target the ul containing the list items.
 * @part value-list-item - Target the li containing the option,
 **/
@Component({
    tag: 'f2-select-list-field',
    styleUrl: 'select-list-field.css',
    shadow: true,
    formAssociated: true,
})
export class SelectListField {
    @Element() host!: HTMLF2SelectListFieldElement;
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string[]>>;
    /** Emitted when the user requests to edit. */
    @Event({ bubbles: true }) requestEdit!: EventEmitter<string>;

    /** The label of the field. */
    @Prop() label!: string;
    /** The messages to display under the field. */
    @Prop() messages?: ValidationMessages;
    /** If the field is currently invalid. */
    @Prop() invalid?: boolean;
    /** Inline documentation text. */
    @Prop() documentation?: string;
    /** Inline documentation link. */
    @Prop() documentationLink?: string;
    /** Inline documentation link text. */
    @Prop() documentationLinkText?: string;
    /**If the field is templated. */
    @Prop() templated?: Templated;

    /** The name of the field. */
    @Prop() name!: string;
    /** The selected item ids */
    @Prop() value!: string[];
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** The icon to display next to the field */
    @Prop() icon?: IconDescription;
    /** The icon to display next to the field */
    @Prop() addIcon: IconDescription = [ICON_NAMESPACE, 'plus'];
    /** Icon for the delete button. */
    @Prop() deleteIcon: IconDescription = [ICON_NAMESPACE, 'trash'];
    /** A list of options to choose from. */
    @Prop() options!: TypeaheadOption[];
    /** Icon to use as a chevron. */
    @Prop() chevronIcon: IconDescription = [ICON_NAMESPACE, 'chevron'];
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    /** Render the list item. */
    @Prop() renderItem: RenderFunction<[option: TypeaheadOption]> = (
        h,
        { name },
    ) => <input readonly class={'value'} value={name} tabindex={-1} />;

    @State() invalidInput: boolean = false;
    @State() remainingOptions: TypeaheadOption[] = [];
    @State() expandedValues: TypeaheadOption[] = [];

    componentWillLoad() {
        this.updateOptions();
    }

    @Watch('value')
    componentDidLoad() {
        const data = new FormData();
        for (const value of this.value) {
            if (value.trim() === '') continue;
            data.append(this.name, value);
        }
        this.internals.setFormValue(data);
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

    renderInput: RenderTypeaheadInput = (
        h,
        { renderInput, open, filter, ref },
    ) => (
        <div
            ref={ref}
            class={{ input: true, open, disabled: !!this.disabled }}
            part={'input'}
        >
            {renderInput(h, {
                class: 'true_input',
                part: 'true_input',
            })}
            {!open || !filter ? (
                <span class={'placeholder'}>{this.placeholder}</span>
            ) : null}
            <es-icon class={'chevron'} icon={this.chevronIcon} size={14} />
        </div>
    );

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
                documentation={this.documentation}
                documentationLink={this.documentationLink}
                documentationLinkText={this.documentationLinkText}
                templated={this.templated}
                templatedValue={this.getTemplatedValue()}
                requestToEdit={this.onRequestToEdit}
            >
                <f2-typeahead
                    clearOnSelect
                    name={this.name}
                    value={this.value}
                    options={this.remainingOptions}
                    renderInput={this.renderInput}
                    onFieldchange={this.onTypeaheadChange}
                />
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
                                {this.renderItem(h, value)}
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
            </Field>
        );
    }

    private onTypeaheadChange = (e: CustomEvent<FieldChange<string[]>>) => {
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

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };

    private getTemplatedValue = () => {
        if (!this.templated) return;
        return this.value.join(', ');
    };
}
