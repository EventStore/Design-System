import { Component, h, Prop, Element, Host } from '@stencil/core';

import { WorkingDataArray } from '../../types';

@Component({
    tag: 'es-input-list',
    styleUrl: 'es-input-list.css',
    shadow: true,
})
export class InputList {
    @Element() host!: HTMLEsListCreatorElement;

    @Prop() label!: string;
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() additionText: string = 'Add item';

    @Prop() name!: string;
    @Prop() data!: WorkingDataArray<string>;

    renderInput = (v: string, i: number) => (
        <es-input
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
