import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import iMask, { InputMask } from 'imask';
import { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

export interface MaskOptions {
    mask: any;
    unmask?: boolean;
    overwrite?: boolean;
    placeholderChar?: string;
    lazy?: boolean;
    definitions?: Record<string, any>;
    blocks?: Record<string, any>;
}

@Component({
    tag: 'es-input',
    styleUrl: 'es-input.css',
    shadow: {
        delegatesFocus: true,
    },
})
export class EsInput {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() label!: string;
    @Prop() name!: string;
    @Prop() value!: string;
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;

    @Prop() mask?: MaskOptions;

    private input?: HTMLInputElement;
    private inputMask?: InputMask<any>;

    componentDidLoad() {
        this.prepareComponent();
    }

    componentDidUpdate() {
        this.prepareComponent();
    }

    componentDidUnload() {
        this.destroyMask();
    }

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <input
                    class={'input'}
                    onInput={this.onInput}
                    onKeyUp={this.onKeyUp}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    ref={this.captureInput}
                />
                <slot />
            </Field>
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

    private prepareComponent = () => {
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
        this.fieldchange.emit({
            name: this.name,
            value: this.maskValue,
        });
    };

    private onInput = (e: any) => {
        if (this.mask) return;
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
