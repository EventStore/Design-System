import {
    Component,
    h,
    Prop,
    Element,
    Host,
    Event,
    type EventEmitter,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { focusFirst } from '@eventstore-ui/utils';

import { ICON_NAMESPACE } from '../../icons/namespace';
import type {
    FieldChange,
    FieldChangeEvent,
    ValidationMessages,
} from '../../types';

/** A list creator input. */
@Component({
    tag: 'es-input-list',
    styleUrl: 'es-input-list.css',
    shadow: true,
})
export class InputList {
    @Element() host!: HTMLEsListCreatorElement;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string[]>>;

    /** The label of the field. */
    @Prop() label!: string;
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

    /** The name of the field. */
    @Prop() name!: string;
    /** The currently selected values */
    @Prop() value!: string[];
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;

    renderInput = (v: string, i: number) => (
        <es-input
            key={i}
            label={this.label}
            placeholder={this.placeholder}
            disabled={this.disabled}
            name={`${this.name}-${i}`}
            onFieldchange={this.onFieldChange(i)}
            messages={this.messages?.children?.[i]}
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
        </es-input>
    );

    render() {
        return (
            <Host>
                {!this.value.length
                    ? this.renderInput('', 0)
                    : this.value.map(this.renderInput)}
                <div class={'row'}>
                    <es-validation-messages messages={this.messages} />
                </div>
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
            </Host>
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

    private onFieldChange = (i: number) => (e: FieldChangeEvent<string>) => {
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
    };

    private inputRefs = new Map<number, HTMLEsInputElement>();
    private captureInput = (i: number) => (r?: HTMLEsInputElement) => {
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
}
