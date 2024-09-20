import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';

import type { FieldChange, ValidationMessages, Templated } from 'types';
import type {
    TypeaheadOption,
    RenderTypeaheadOption,
    OptionFilter,
} from 'components/typeahead/types';
import { Field } from 'components/Field';
import type { RenderSelectValue } from '../types';

/** A text input. */
@Component({
    tag: 'f2-select-field',
    styleUrl: '../../field.css',
    formAssociated: true,
    shadow: true,
})
export class SelectField {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;
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
    /** If the field is templated. */
    @Prop() templated?: Templated;

    /** The name of the field. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: string | null;
    /** A list of options to choose from. */
    @Prop() options!: TypeaheadOption[];
    /** Overwrite the default option renderer. */
    @Prop() renderOption?: RenderTypeaheadOption<any>;
    /** Overwrite the default value renderer. */
    @Prop() renderValue?: RenderSelectValue<any>;
    /** Pass a custom search filter function */
    @Prop() optionFilter?: OptionFilter;
    /** The placeholder for the input. */
    @Prop() placeholder?: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** Icon to use as a chevron. */
    @Prop() chevronIcon?: IconDescription;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    @Watch('value')
    componentDidLoad() {
        this.internals.setFormValue(this.value);
    }

    render() {
        return (
            <Field
                label={this.label}
                messages={this.messages}
                invalid={this.invalid}
                documentation={this.documentation}
                documentationLink={this.documentationLink}
                documentationLinkText={this.documentationLinkText}
                templated={this.templated}
                templatedValue={
                    this.templated ? this.getSelectedOption()?.name : undefined
                }
                requestToEdit={this.onRequestToEdit}
            >
                <f2-select-input
                    name={this.name}
                    value={this.value}
                    options={this.options}
                    renderOption={this.renderOption}
                    renderValue={this.renderValue}
                    optionFilter={this.optionFilter}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    chevronIcon={this.chevronIcon}
                    inputProps={this.inputProps}
                >
                    <slot />
                </f2-select-input>
            </Field>
        );
    }

    private getSelectedOption = () =>
        this.options.find((option) => option.value === this.value);

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
