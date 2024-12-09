import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import iMask from 'imask';

import { Field } from 'components/Field';
import type { FieldChange, ValidationMessages, Templated } from 'types';
import type { MaskOptions } from '../types';

/** A masked text input. */
@Component({
    tag: 'f2-masked-text-field',
    styleUrl: '../../field.css',
    formAssociated: true,
    shadow: true,
})
export class MaskedTextField {
    @AttachInternals() internals?: ElementInternals;

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
    /**If the field is templated. */
    @Prop() templated?: Templated;

    /** The name of the input. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** If the input is editable. */
    @Prop() readonly?: boolean;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    /** Apply an input mask */
    @Prop() mask!: MaskOptions;

    @Watch('value')
    componentDidLoad() {
        this.internals?.setFormValue(this.value);
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
                templatedValue={this.getTemplatedValue()}
                requestToEdit={this.onRequestToEdit}
            >
                <f2-masked-text-input
                    name={this.name}
                    value={this.value}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    inputProps={this.inputProps}
                    invalid={this.invalid}
                    mask={this.mask}
                    exportparts={'input'}
                >
                    <slot />
                </f2-masked-text-input>
            </Field>
        );
    }

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };

    private pipe?: (value: string) => string;

    @Watch('mask')
    setPipe(mask: MaskOptions) {
        this.pipe = iMask.createPipe(mask);
    }

    private getTemplatedValue = () => {
        if (!this.templated) return;
        if (!this.pipe) this.setPipe(this.mask);
        return this.pipe?.(this.value) ?? this.value;
    };
}
