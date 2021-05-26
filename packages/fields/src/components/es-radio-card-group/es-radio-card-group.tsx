import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    VNode,
    Host,
    Fragment,
} from '@stencil/core';
import { ValidationMessages } from '../../types';

export interface RadioCardGroupOption {
    id: string;
    name: string;
    description?: string;
    disabled?: boolean;
    [key: string]: any;
}
export type RenderCard<T extends RadioCardGroupOption> = (
    option: T,
    active: boolean,
) => VNode | VNode[];

@Component({
    tag: 'es-radio-card-group',
    styleUrl: 'es-radio-card-group.css',
    shadow: true,
})
export class RadioCardGroup {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop({ reflect: true, attribute: 'aria-labelledby' }) labelledby!: string;
    @Prop() options!: RadioCardGroupOption[];
    @Prop() value!: string | null;
    @Prop() name!: string;
    @Prop() groupBy?: string;
    @Prop() renderCard: RenderCard<any> = RadioCardGroup.defaultRenderCard;
    @Prop() invalid: boolean = false;
    @Prop() messages?: ValidationMessages;

    static defaultRenderCard: RenderCard<RadioCardGroupOption> = (option) => [
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
                                const active = option.id === this.value;
                                return (
                                    <label
                                        class={{
                                            active,
                                            disabled: !!option.disabled,
                                        }}
                                    >
                                        <input
                                            type={'radio'}
                                            name={this.name}
                                            value={option.id}
                                            checked={active}
                                            onChange={this.handleChange}
                                            disabled={option.disabled}
                                        />
                                        {this.renderCard(option, active)}
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
