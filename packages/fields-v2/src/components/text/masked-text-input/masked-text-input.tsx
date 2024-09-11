import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Watch,
    AttachInternals,
    Host,
} from '@stencil/core';
import iMask, { type InputMask } from 'imask';

import type { FieldChange } from 'types';
import type { MaskOptions } from './types';

/** A masked text input. */
@Component({
    tag: 'f2-masked-text-input',
    styleUrl: '../text-input/text-input.css',
    formAssociated: true,
    shadow: true,
})
export class MaskedTextInput {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;

    /** The name of the input. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** If the input is editable. */
    @Prop() readonly?: boolean;
    /** If the input is currently invalid. */
    @Prop() invalid?: boolean;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    /** Apply an input mask */
    @Prop() mask!: MaskOptions;

    private input?: HTMLInputElement;
    private inputMask?: InputMask<any>;

    componentDidLoad() {
        this.preparemask();
        this.internals.setFormValue(this.value);
    }

    componentDidUpdate() {
        this.preparemask();
    }

    disconnectedCallback() {
        this.destroyMask();
    }

    @Watch('value')
    updateMaskValue() {
        this.maskValue = this.value;
    }

    render() {
        return (
            <Host>
                <input
                    {...(this.inputProps ?? {})}
                    class={{ input: true, invalid: !!this.invalid }}
                    part={'input'}
                    onInput={this.onInput}
                    onKeyUp={this.onKeyUp}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    ref={this.captureInput}
                />
                <slot />
            </Host>
        );
    }

    private get maskValue() {
        if (!this.inputMask) return this.input?.value ?? '';
        if (this.mask?.unmask) return this.inputMask.unmaskedValue;
        return this.inputMask.value;
    }

    private set maskValue(v: string) {
        if (!this.inputMask) return;

        const value = v == null ? '' : v;

        if (this.mask?.unmask) {
            this.inputMask.unmaskedValue = value;
        } else {
            this.inputMask.value = value;
        }
    }

    private preparemask = () => {
        if (!this.mask) {
            this.destroyMask();
            if (this.input) {
                this.input.value = this.value;
            }
        } else if (this.inputMask) {
            this.updateMask();
        } else {
            this.initMask();
        }
    };

    private initMask = () => {
        if (!this.input) return;
        this.inputMask = iMask(this.input, this.mask as any);
        this.maskValue = this.value;
        this.inputMask.on('accept', this.onAccept);
    };

    private updateMask = () => {
        this.inputMask?.updateOptions(this.mask as any);
    };

    private destroyMask = () => {
        if (!this.inputMask) return;
        this.inputMask.destroy();
        delete this.inputMask;
    };

    private captureInput = (ref?: HTMLInputElement) => {
        this.input = ref;
    };

    private onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.metaKey) {
            this.enter.emit();
        }
    };

    private onAccept = () => {
        if (!this.mask) return;
        this.emitValue(this.maskValue);
    };

    private onInput = (e: InputEvent) => {
        if (this.mask) return;
        this.emitValue((e.target as HTMLInputElement).value ?? '');
    };

    private emitValue = (value: string) => {
        this.internals.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
