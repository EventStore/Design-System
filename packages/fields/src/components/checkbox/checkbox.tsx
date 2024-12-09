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
import { ICON_NAMESPACE } from 'icons/namespace';
import type { FieldChange } from 'types';

/** A checkbox component */
@Component({
    tag: 'f2-checkbox',
    styleUrl: 'checkbox.css',
    shadow: true,
    formAssociated: true,
})
export class Checkbox {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<boolean>>;

    /** The name of the field. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: boolean;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The icon to use. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];

    @Watch('value')
    componentDidLoad() {
        this.internals?.setFormValue(this.value.toString());
    }

    render() {
        return (
            <label
                class={{ field: true, invalid: !!this.invalid }}
                tabindex={this.disabled ? undefined : 0}
                onKeyDown={this.onKeyDown}
            >
                <input
                    class={'input'}
                    type={'checkbox'}
                    name={this.name}
                    onChange={this.onChange}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    checked={this.value}
                />
                <c2-icon icon={this.icon} class={'checkbox'} size={12} />
                <span class={'label'}>
                    <slot />
                </span>
            </label>
        );
    }

    private onChange = (e: Event) => {
        this.emitChange((e.target as HTMLInputElement)?.checked);
    };

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== ' ' && e.key !== 'Enter') return;

        e.preventDefault();

        const input = (
            e.target as HTMLLabelElement
        )?.querySelector<HTMLInputElement>('input');

        if (!input) return;

        input.checked = !input.checked;
        this.emitChange(input.checked);
    };

    private emitChange = (value: boolean) => {
        this.fieldchange.emit({
            name: this.name,
            value,
        });
        this.internals?.setFormValue(value.toString());
    };
}
