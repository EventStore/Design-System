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
import { ICON_NAMESPACE } from 'icons/namespace';
import { Field } from 'components/Field';
import type { MultiCheckboxOption } from './types';

/**
 * A multi-checkbox component
 * @part checkbox-field - Checkbox Field.
 */
@Component({
    tag: 'f2-multi-checkbox-field',
    styleUrl: 'multi-checkbox-field.css',
    shadow: true,
    formAssociated: true,
})
export class MultiCheckboxField {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<
        FieldChange<Set<string>>
    >;
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
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: Set<string>;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** The icon to use. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** The list of options for the checkboxes. */
    @Prop() options!: MultiCheckboxOption[];

    @Watch('value')
    componentDidLoad() {
        const data = new FormData();
        for (const value of this.value) {
            data.append(this.name, value);
        }
        this.internals?.setFormValue(data);
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
                elements={{
                    outer: (props, children) => (
                        <div
                            {...props}
                            role={'group'}
                            aria-labelledby={`${this.name}-label`}
                        >
                            {children}
                        </div>
                    ),
                    label: (props, children) => (
                        <span {...props} id={`${this.name}-label`}>
                            {children}
                        </span>
                    ),
                }}
            >
                <div class={'checkbox-field'} part={'checkbox-field'}>
                    {this.options.map((option) => {
                        const disabled =
                            option.disabled || this.disabled || false;

                        return (
                            <label
                                key={option.value}
                                tabIndex={disabled ? undefined : 0}
                                onKeyDown={this.onKeyDown}
                                class={{ disabled }}
                            >
                                <input
                                    class={'input'}
                                    type={'checkbox'}
                                    onChange={this.onChange}
                                    value={option.value}
                                    disabled={disabled}
                                    readonly={this.readonly}
                                    checked={this.value.has(option.value)}
                                />
                                <c2-icon
                                    icon={this.icon}
                                    class={'multi-checkbox'}
                                    size={12}
                                />
                                <span class={'checkbox-label'}>
                                    {option.name}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </Field>
        );
    }

    private emitFieldChange = ({ value, checked }: HTMLInputElement) => {
        if (!value) return;

        const newValue = new Set<string>(this.value);

        if (checked) {
            newValue.add(value);
        } else if (newValue) {
            newValue.delete(value);
        }

        this.fieldchange.emit({
            name: this.name,
            value: newValue,
        });
    };

    private onChange = (e: Event) =>
        this.emitFieldChange(e.target as HTMLInputElement);

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== ' ' && e.key !== 'Enter') return;

        e.preventDefault();

        const input = (
            e.target as HTMLLabelElement
        )?.querySelector<HTMLInputElement>('input');

        if (!input) return;

        input.checked = !input.checked;
        this.emitFieldChange(input);
    };

    private getTemplatedValue = () => {
        if (!this.templated) return;
        return this.options
            .reduce<string[]>((acc, { name, value }) => {
                if (this.value.has(value)) acc.push(name);
                return acc;
            }, [])
            .join(', ');
    };

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
