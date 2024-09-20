import {
    Component,
    h,
    Prop,
    Element,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { focusFirst } from '@eventstore-ui/utils';

import type { FieldChange, ValidationMessages, Templated } from 'types';
import { ICON_NAMESPACE } from 'icons/namespace';
import { Field } from 'components/Field';

/** A list creator input. */
@Component({
    tag: 'f2-text-list-field',
    styleUrl: 'text-list-field.css',
    formAssociated: true,
    shadow: true,
})
export class TextListField {
    @Element() host!: HTMLF2TextListFieldElement;
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
    @Prop({ reflect: true }) name!: string;
    /** The currently selected values */
    @Prop() value!: string[];
    /** Display a placeholder in the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** Text for the add item button. */
    @Prop() additionText: string = 'Add item';
    /** Icon for the add item button. */
    @Prop() additionIcon: IconDescription = [ICON_NAMESPACE, 'plus'];
    /** Icon for the delete button. */
    @Prop() deleteIcon: IconDescription = [ICON_NAMESPACE, 'trash'];

    @Watch('value')
    componentDidLoad() {
        const data = new FormData();
        for (const value of this.value) {
            if (value.trim() === '') continue;
            data.append(this.name, value);
        }
        this.internals.setFormValue(data);
    }

    renderInput = (v: string, i: number) => (
        <f2-text-input
            key={`row-${i}`}
            placeholder={this.placeholder}
            disabled={this.disabled}
            name={`${this.name}-${i}`}
            onFieldchange={this.onFieldChange(i)}
            value={v}
            ref={this.captureInput(i)}
            onEnter={this.onAdd}
        >
            <es-button
                class={'delete_row'}
                variant={'minimal'}
                onClick={this.onDelete(i)}
            >
                <es-icon icon={this.deleteIcon} size={20} />
            </es-button>
        </f2-text-input>
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
                            <es-icon
                                icon={this.additionIcon}
                                slot={'after'}
                                size={20}
                            />
                        </es-button>
                    </div>
                )}
            </Field>
        );
    }

    private expectFocus?: number;
    private onAdd = () => {
        if (this.value.at(-1) === '') {
            const ref = this.inputRefs.get(this.value.length - 1);
            if (ref) focusFirst(ref);
        } else {
            this.expectFocus = this.value.length;
            this.fieldchange.emit({
                name: this.name,
                value: [...this.value, ''],
            });
        }
    };

    private onFieldChange =
        (i: number) => (e: CustomEvent<FieldChange<string>>) => {
            e.stopImmediatePropagation();
            const value = e.detail.value;
            this.fieldchange.emit({
                name: this.name,
                value: [
                    ...this.value.slice(0, i),
                    value,
                    ...this.value.slice(i + 1),
                ],
            });
        };

    private onDelete = (i: number) => () => {
        this.fieldchange.emit({
            name: this.name,
            value:
                this.value.length === 1
                    ? ['']
                    : [...this.value.slice(0, i), ...this.value.slice(i + 1)],
        });
        this.expectFocus = Math.min(i, this.value.length - 2);
    };

    private inputRefs = new Map<number, HTMLF2TextInputElement>();
    private captureInput = (i: number) => (r?: HTMLF2TextInputElement) => {
        if (r) {
            this.inputRefs.set(i, r);
        } else {
            this.inputRefs.delete(i);
        }
    };

    componentDidRender() {
        if (this.expectFocus == null) return;
        const ref = this.inputRefs.get(this.expectFocus);
        if (ref) focusFirst(ref);
        delete this.expectFocus;
    }

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };

    private getTemplatedValue = () => {
        if (!this.templated) return;
        return this.value.join(', ');
    };
}
