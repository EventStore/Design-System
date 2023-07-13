import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Host,
    Fragment,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';
import type { FieldChange, ValidationMessages } from '../../types';
import type { RadioCardGroupOption, RenderCard } from './types';

/**
 * A card based single select input.
 * @part group-title - The title of a card group.
 */
@Component({
    tag: 'es-radio-card-group',
    styleUrl: 'es-radio-card-group.css',
    shadow: true,
})
export class RadioCardGroup {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<
        FieldChange<string | null>
    >;

    /** The id of the component that labels this input. This input doesn't bring its own label, so must be labeled externally and referenced here. */
    @Prop({ reflect: true, attribute: 'aria-labelledby' }) labelledby!: string;
    /** The options to be displayed and chosen from. */
    @Prop() options!: RadioCardGroupOption[];
    /** The current value of the field. */
    @Prop() value!: string | null;
    /** The name of the field. */
    @Prop({ reflect: true }) name!: string;
    /** Group the cards by a key.*/
    @Prop() groupBy?: string;
    /** Overwrite the default card renderer */
    @Prop() renderCard: RenderCard<any> = RadioCardGroup.defaultRenderCard;
    /** If the field is currently in an error state. */
    @Prop() invalid: boolean = false;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;
    /** Icon to display when checked. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];

    static defaultRenderCard: RenderCard<RadioCardGroupOption> = (
        h,
        option,
    ) => [
        <span class={'label'}>{option.name}</span>,
        <span class={'description'}>{option.description}</span>,
    ];

    render() {
        return (
            <Host class={{ invalid: this.invalid }}>
                {this.groupOptions().map(([title, group]) => (
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
                                            disabled: !!option.disabled,
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
                                        <es-icon icon={this.icon} />
                                    </label>
                                );
                            })}
                        </div>
                    </Fragment>
                ))}
                <es-validation-messages messages={this.messages} />
            </Host>
        );
    }

    private groupOptions = (): Array<[string, RadioCardGroupOption[]]> => {
        if (!this.groupBy) return [['', this.options]];
        return Array.from(
            this.options.reduce((acc, option) => {
                const group = option[this.groupBy!] ?? '';
                if (!acc.has(group)) {
                    acc.set(group, []);
                }
                acc.get(group)!.push(option);
                return acc;
            }, new Map<string, RadioCardGroupOption[]>()),
        );
    };

    private handleChange = (e: any) => {
        e.preventDefault();
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
