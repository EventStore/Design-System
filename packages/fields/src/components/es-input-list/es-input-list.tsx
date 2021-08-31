import { Component, h, Prop, Element, Host } from '@stencil/core';

import type { WorkingDataArray } from '../../types';

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
    /** Text for the add icon button. */
    @Prop() additionText: string = 'Add item';

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
            <es-button
                class={'delete_item'}
                variant={'outline'}
                color={'secondary'}
                onClick={() => this.data.delete(i)}
            >
                <es-icon icon={'trash'} size={20} />
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
                            <es-icon icon={'plus'} slot={'after'} size={20} />
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
