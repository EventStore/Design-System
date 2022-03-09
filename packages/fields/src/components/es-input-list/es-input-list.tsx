import { Component, h, Prop, Element, Host } from '@stencil/core';
import type { IconDescription } from '@eventstore/components';

import type { WorkingDataArray } from '../../types';
import { ES_FIELDS } from '../../icons/namespace';

/** A list creator input. */
@Component({
    tag: 'es-input-list',
    styleUrl: 'es-input-list.css',
    shadow: true,
})
export class InputList {
    @Element() host!: HTMLEsListCreatorElement;
    /** The label of the field. */
    @Prop() label!: string;
    /** Display a placeholder in the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** Text for the add item button. */
    @Prop() additionText: string = 'Add item';
    /** Icon for the add item button. */
    @Prop() additionIcon: IconDescription = [ES_FIELDS, 'plus'];
    /** Icon for the delete button. */
    @Prop() deleteIcon: IconDescription = [ES_FIELDS, 'trash'];

    /** The name of the field. */
    @Prop() name!: string;
    /** The backing WorkingDataArray */
    @Prop() data!: WorkingDataArray<string>;

    renderInput = (v: string, i: number) => (
        <es-input
            key={i}
            label={this.label}
            placeholder={this.placeholder}
            disabled={this.disabled}
            {...this.data.connect(i)}
            value={v}
        >
            <es-button variant={'minimal'} onClick={() => this.data.delete(i)}>
                <es-icon icon={this.deleteIcon} size={20} />
            </es-button>
        </es-input>
    );

    render() {
        return (
            <Host>
                {!this.data.data.length
                    ? this.renderInput('', 0)
                    : this.data.data.map(this.renderInput)}
                <div class={'row'}>
                    <es-validation-messages messages={this.data.messages} />
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

    private onAdd = () => {
        this.data.set(this.data.data.length, '');
    };
}
