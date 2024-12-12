import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Element,
    AttachInternals,
    Host,
} from '@stencil/core';
import type { IconDescription } from '@kurrent-ui/components';

import type { FieldChange } from 'types';
import type {
    RenderTypeaheadInput,
    TypeaheadOption,
    OptionFilter,
    RenderTypeaheadOption,
} from 'components/typeahead/types';
import { ICON_NAMESPACE } from 'icons/namespace';
import type { RenderSelectValue } from '../types';

/**
 * A searchable select dropdown.
 * @part input - The wrapping div of the input.
 * @part true_input - The input element.
 */
@Component({
    tag: 'f2-select-input',
    styleUrl: 'select-input.css',
    shadow: true,
    formAssociated: true,
})
export class Select {
    @Element() host!: HTMLElement;
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<
        FieldChange<string | null>
    >;

    /** The name of the field. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: string | null;
    /** A list of options to choose from. */
    @Prop() options!: TypeaheadOption[];
    /** Overwrite the default option renderer. */
    @Prop() renderOption?: RenderTypeaheadOption<any>;
    /** Overwrite the default value renderer. */
    @Prop() renderValue: RenderSelectValue<any> = (_, o, v) => o?.name ?? v;
    /** Pass a custom search filter function */
    @Prop() optionFilter?: OptionFilter;
    /** The placeholder for the input. */
    @Prop() placeholder?: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** Icon to use as a chevron. */
    @Prop() chevronIcon: IconDescription = [ICON_NAMESPACE, 'chevron'];
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    renderPlaceholder = () => (
        <span class={'placeholder'}>{this.placeholder}</span>
    );

    renderInput: RenderTypeaheadInput = (
        h,
        { renderInput, open, filter, ref },
    ) => (
        <div
            ref={ref}
            class={{ input: true, open, disabled: !!this.disabled }}
            part={'input'}
        >
            {renderInput(h, {
                ...(this.inputProps ?? {}),
                class: 'true_input',
                part: 'true_input',
            })}
            {!open || !filter
                ? this.value
                    ? this.renderValue(
                          h,
                          this.findOption(this.value),
                          this.value,
                      )
                    : this.renderPlaceholder()
                : null}
            <c2-icon class={'chevron'} icon={this.chevronIcon} size={20} />
        </div>
    );

    render() {
        return (
            <Host>
                <f2-typeahead
                    name={this.name}
                    value={this.value ? [this.value] : []}
                    closeOnSelect
                    renderInput={this.renderInput}
                    renderOption={this.renderOption}
                    options={this.options}
                    optionFilter={this.optionFilter}
                    onFieldchange={this.onTypeaheadChange}
                    disabled={this.disabled}
                />
                <slot />
            </Host>
        );
    }

    private findOption = (value: string) =>
        this.options.find((o) => o.value === value);

    private onTypeaheadChange = (e: CustomEvent<FieldChange<string[]>>) => {
        e.stopPropagation();

        const value = e.detail.value.at(-1) ?? null;
        this.internals?.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
