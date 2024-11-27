import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Method,
    State,
    Fragment,
    Host,
    AttachInternals,
    Watch,
} from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import type { IconDescription } from '@kurrent-ui/components';
import { ICON_NAMESPACE } from 'icons/namespace';
import type { FieldChange } from 'types';

/** A switchable switch. */
@Component({
    tag: 'f2-switch',
    styleUrl: 'switch.css',
    shadow: true,
    formAssociated: true,
})
export class Switch {
    @AttachInternals() internals!: ElementInternals;

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
    /** Text to display when switch is on in high contrast mode. */
    @Prop() activeText: string = 'On';
    /** Text to display when switch is off in high contrast mode. */
    @Prop() inactiveText: string = 'Off';
    /** Icon to display when switch is on in high contrast mode. */
    @Prop() activeIcon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** Icon to display when switch is off in high contrast mode. */
    @Prop() inactiveIcon: IconDescription = [ICON_NAMESPACE, 'check'];

    @State() pending: boolean = false;

    /** Allows you to pause interaction with the input while an operation completes. */
    @Method() async setPending(pending: boolean) {
        this.pending = pending;
    }

    @Watch('value')
    componentDidLoad() {
        this.internals.setFormValue(this.value.toString());
    }

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()}>
                <button
                    class={{
                        field: true,
                        invalid: !!this.invalid,
                        checked: this.value,
                    }}
                    tabIndex={0}
                    onKeyDown={this.keyDown}
                    onClick={this.onClick}
                    disabled={this.disabled}
                >
                    {theme.isHighContrast() ? (
                        <>
                            <c2-icon
                                icon={
                                    this.value
                                        ? this.activeIcon
                                        : this.inactiveIcon
                                }
                                class={'checkbox'}
                                size={12}
                            />
                            <span>
                                {this.value
                                    ? this.activeText
                                    : this.inactiveText}
                            </span>
                        </>
                    ) : (
                        <svg
                            xmlns={'http://www.w3.org/2000/svg'}
                            width={45}
                            height={16}
                            viewBox={'0 0 45 16'}
                            class={'switch'}
                        >
                            <line
                                class={'track'}
                                x1={4}
                                x2={41}
                                y1={8}
                                y2={8}
                                stroke-linecap={'round'}
                            />
                            <circle class={'handle'} cx={8} cy={8} r={8} />
                        </svg>
                    )}
                </button>
            </Host>
        );
    }

    private keyDown = (e: KeyboardEvent) => {
        if (this.disabled || this.pending) return;
        if (e.key === ' ' || e.key === 'Enter') {
            this.emitChange(!this.value);
        }
    };

    private onClick = () => {
        if (this.disabled || this.pending) return;
        this.emitChange(!this.value);
    };

    private emitChange = (value: boolean) => {
        this.fieldchange.emit({
            name: this.name,
            value,
        });
        this.internals.setFormValue(value.toString());
    };
}
