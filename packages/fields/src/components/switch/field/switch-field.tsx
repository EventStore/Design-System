import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import type { IconDescription } from '@kurrent-ui/components';

import type { FieldChange, ValidationMessages, Templated } from 'types';

import { Field } from 'components/Field';
import { ICON_NAMESPACE } from 'icons/namespace';

/**
 * A switch with a label.
 * @part inner - The inner div.
 */
@Component({
    tag: 'f2-switch-field',
    styleUrl: 'switch-field.css',
    formAssociated: true,
    shadow: true,
})
export class SwitchField {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<boolean>>;
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
    @Prop() value!: boolean;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** Text to display when switch is on in high contrast mode. */
    @Prop() activeText: string = 'On';
    /** Text to display when switch is off in high contrast mode. */
    @Prop() inactiveText: string = 'Off';
    /** Icon to display when switch is on in high contrast mode. */
    @Prop() activeIcon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** Icon to display when switch is off in high contrast mode. */
    @Prop() inactiveIcon: IconDescription = [ICON_NAMESPACE, 'check'];

    @Watch('value')
    componentDidLoad() {
        this.internals?.setFormValue(this.value.toString());
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
                    this.value ? this.activeText : this.inactiveText
                }
                requestToEdit={this.onRequestToEdit}
            >
                <div class={'inner'} part={'inner'}>
                    <f2-switch
                        name={this.name}
                        value={this.value}
                        disabled={this.disabled}
                        readonly={this.readonly}
                        activeText={this.activeText}
                        inactiveText={this.inactiveText}
                        activeIcon={this.activeIcon}
                        inactiveIcon={this.inactiveIcon}
                    />
                    <slot />
                </div>
            </Field>
        );
    }

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
