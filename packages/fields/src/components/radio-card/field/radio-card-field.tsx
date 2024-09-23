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

import { Field } from 'components/Field';
import { ICON_NAMESPACE } from 'icons/namespace';
import type { FieldChange, ValidationMessages, Templated } from 'types';
import type { RadioCardOption, RenderCard } from '../types';

/**
 * A card based single select field.
 * @part group-title - The title of a card group.
 */
@Component({
    tag: 'f2-radio-card-field',
    styleUrl: '../../field.css',
    formAssociated: true,
    shadow: true,
})
export class RadioCardInput {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
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
    @Prop({ reflect: true }) name!: string;
    /** The current value of the input. */
    @Prop() value!: string | null;
    /** The options to be displayed and chosen from. */
    @Prop() options!: RadioCardOption[];
    /** Group the cards by a key.*/
    @Prop() groupBy?: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** Overwrite the default card renderer */
    @Prop() renderCard?: RenderCard<any>;
    /** Parts in the card, to be exported on the top level. */
    @Prop() cardParts?: string[];
    /** Icon to display when checked. */
    @Prop() checkIcon: IconDescription = [ICON_NAMESPACE, 'check'];

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
                <f2-radio-card-input
                    name={this.name}
                    value={this.value}
                    options={this.options}
                    groupBy={this.groupBy}
                    disabled={this.disabled}
                    renderCard={this.renderCard}
                    checkIcon={this.checkIcon}
                    invalid={this.invalid}
                    exportparts={[
                        'group-title',
                        ...(this.cardParts ?? []),
                    ].join(', ')}
                >
                    <slot />
                </f2-radio-card-input>
            </Field>
        );
    }

    private getSelectedOption = () =>
        this.options.find((option) => option.value === this.value);

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
