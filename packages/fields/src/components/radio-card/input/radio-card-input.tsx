import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Fragment,
    AttachInternals,
    Host,
} from '@stencil/core';
import type { IconDescription } from '@kurrent-ui/components';

import { ICON_NAMESPACE } from 'icons/namespace';
import type { FieldChange } from 'types';
import type { RadioCardOption, RenderCard } from '../types';

/**
 * A card based single select input.
 * @part group-title - The title of a card group.
 */
@Component({
    tag: 'f2-radio-card-input',
    styleUrl: 'radio-card-input.css',
    formAssociated: true,
    shadow: true,
})
export class RadioCardInput {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;

    /** The name of the input. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the input. */
    @Prop() value!: string | null;
    /** The placeholder to show if there are no options. */
    @Prop() placeholder?: string;
    /** The options to be displayed and chosen from. */
    @Prop() options!: RadioCardOption[];
    /** Group the cards by a key.*/
    @Prop() groupBy?: string;
    /** Overwrite the default card renderer */
    @Prop() renderCard: RenderCard<any> = RadioCardInput.defaultRenderCard;
    /** If the input is currently in an error state. */
    @Prop() invalid: boolean = false;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** Icon to display when checked. */
    @Prop() checkIcon: IconDescription = [ICON_NAMESPACE, 'check'];

    componentDidLoad() {
        this.internals?.setFormValue(this.value);
    }

    static defaultRenderCard: RenderCard<RadioCardOption> = (h, option) => (
        <div class={'default_card'}>
            <span class={'label'}>{option.name}</span>
            <span class={'description'}>{option.description}</span>
        </div>
    );

    renderOptions = () => {
        return this.groupOptions().map(([title, group]) => (
            <Fragment>
                {!!title.length && (
                    <span class={'group-title'} part={'group-title'}>
                        {title}
                    </span>
                )}
                <div class={'group-inner'}>
                    {group.map((option) => {
                        const active = option.value === this.value;
                        return (
                            <label
                                class={{
                                    active,
                                    disabled:
                                        this.disabled ?? !!option.disabled,
                                    invalid: this.invalid,
                                }}
                                htmlFor={`${this.name}-${option.value}`}
                            >
                                <input
                                    type={'radio'}
                                    id={`${this.name}-${option.value}`}
                                    name={this.name}
                                    value={option.value}
                                    checked={active}
                                    onChange={this.handleChange}
                                    disabled={option.disabled}
                                />
                                {this.renderCard(h, option, active)}
                                <c2-icon
                                    class={'check_icon'}
                                    icon={this.checkIcon}
                                />
                            </label>
                        );
                    })}
                </div>
            </Fragment>
        ));
    };

    render() {
        return (
            <Host class={{ invalid: this.invalid }}>
                <div class={'cards'}>
                    {!this.options.length
                        ? this.placeholder
                        : this.renderOptions()}
                </div>
                <slot />
            </Host>
        );
    }

    private groupOptions = (): Array<[string, RadioCardOption[]]> => {
        if (!this.groupBy) return [['', this.options]];
        return Array.from(
            this.options.reduce((acc, option) => {
                const group = option[this.groupBy!] ?? '';
                if (!acc.has(group)) {
                    acc.set(group, []);
                }
                acc.get(group)!.push(option);
                return acc;
            }, new Map<string, RadioCardOption[]>()),
        );
    };

    private handleChange = (e: Event) => {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value ?? '';
        this.internals?.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
