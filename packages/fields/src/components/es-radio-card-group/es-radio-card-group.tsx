import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    VNode,
    Host,
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
    shadow: {
        delegatesFocus: true,
    },
})
export class RadioCardGroup {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop({ reflect: true, attribute: 'aria-labelledby' }) labelledby!: string;
    @Prop() options!: RadioCardGroupOption[];
    @Prop() value!: string | null;
    @Prop() name!: string;
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
                <div class={'group-inner'}>
                    {this.options.map((option) => {
                        const active = option.id === this.value;
                        return (
                            <label
                                class={{ active, disabled: !!option.disabled }}
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
                <es-validation-messages messages={this.messages} />
            </Host>
        );
    }

    private handleChange = (e: any) => {
        e.preventDefault();
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
