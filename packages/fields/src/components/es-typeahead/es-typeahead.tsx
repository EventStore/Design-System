import { theme } from '@eventstore/theme';
import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    State,
    Watch,
    Host,
} from '@stencil/core';
import type {
    TypeaheadOption,
    OptionFilter,
    RenderTypeaheadField,
    RenderTypeaheadOption,
} from './types';

/** @internal */
@Component({
    tag: 'es-typeahead',
    styleUrl: 'es-typeahead.css',
    shadow: false,
    scoped: false,
})
export class EsTypeahead {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() name!: string;
    @Prop() value!: string[];
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() closeOnSelect: boolean = false;
    @Prop() clearOnSelect: boolean = false;
    @Prop() options!: TypeaheadOption[];
    @Prop() optionFilter: OptionFilter = (f, { name }) => {
        return name.toLowerCase().includes(f.toLowerCase());
    };
    @Prop() renderField!: RenderTypeaheadField;
    @Prop() renderOption: RenderTypeaheadOption = ({ name }) => name;

    @State() open: boolean = false;
    @State() filter: string = '';

    private filterClearance!: ReturnType<typeof setTimeout>;
    private filteredOptions: TypeaheadOption[] = [];

    componentWillLoad() {
        this.filterValues();
    }

    @Watch('options')
    @Watch('filter')
    filterValues() {
        const filter = this.filter.trim();
        this.filteredOptions = this.options.filter((option) =>
            this.optionFilter(filter, option),
        );

        if (!this.filteredOptions.length && this.open) {
            this.inputElement?.focus();
        }
    }

    @Watch('open')
    clearFilterOnClose(open: boolean) {
        clearTimeout(this.filterClearance);

        if (!open) {
            this.filterClearance = setTimeout(() => {
                this.filter = '';
            }, 0);
        }
    }

    renderInput = (props: any) => (
        <input
            type={'text'}
            part={'input'}
            autocapitalize={'none'}
            autocomplete={'off'}
            autocorrect={'off'}
            spellcheck={'false'}
            aria-autocomplete={'list'}
            {...props}
            name={this.name}
            ref={this.captureInput}
            onInput={this.onChangeInput}
            onKeyDown={this.onKeyDown}
            disabled={this.disabled}
            readonly={this.readonly}
            onFocus={this.onFocus}
            onClick={this.onFocus}
            onBlur={this.onBlur}
            value={this.filter}
        />
    );

    renderOptions = () => {
        return this.filteredOptions.map((option) => {
            const active = this.value.includes(option.value);
            return (
                <li class={'list_item'}>
                    <button
                        class={{
                            option: true,
                            active,
                        }}
                        part={'option'}
                        onMouseDown={this.forceFocus}
                        onTouchStart={this.forceFocus}
                        onClick={this.clickOption(option.value)}
                        tabIndex={0}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        type={'button'}
                        onKeyDown={this.onKeyDown}
                        value={option.value}
                    >
                        {this.renderOption(option, active)}
                    </button>
                </li>
            );
        });
    };

    render() {
        return (
            <Host>
                {this.renderField({
                    Input: this.renderInput,
                    value: this.value,
                    open: this.open,
                    filter: this.filter,
                    ref: this.captureField,
                })}
                {this.open && (
                    <es-popover
                        arrow
                        open={this.open}
                        popperClass={'typeahead'}
                        attachTo={this.fieldElement}
                        placement={'bottom'}
                        flip={['top']}
                        autoSize={'width'}
                        constrain={'height'}
                        maxHeight={300}
                    >
                        <div class={'list_sizer'}>
                            <ul
                                class={'list'}
                                part={'list'}
                                ref={this.captureList}
                                high-contrast={theme.isHighContrast()}
                            >
                                {!this.filteredOptions.length && (
                                    <li class={'list_item'}>
                                        <span class={'empty_message'}>
                                            {this.filter.trim().length
                                                ? `No options matching "${this.filter.trim()}".`
                                                : 'No options available'}
                                        </span>
                                    </li>
                                )}
                                {this.renderOptions()}
                            </ul>
                        </div>
                    </es-popover>
                )}
            </Host>
        );
    }

    private listElement?: HTMLUListElement;
    private captureList = (ref?: HTMLUListElement) => {
        this.listElement = ref;
    };

    private inputElement?: HTMLInputElement;
    private captureInput = (ref?: HTMLInputElement) => {
        this.inputElement = ref;
    };

    private fieldElement?: HTMLElement;
    private captureField = (ref?: HTMLElement) => {
        this.fieldElement = ref;
    };

    // safari doesn't focus a button on click, so we need to force it for compatability
    private forceFocus = (e: any) => {
        e?.target?.focus?.();
    };

    private onFocus = () => {
        this.open = true;
    };

    private onBlur = (e: FocusEvent) => {
        // Element has been removed as soon as it was selected. We need to regain focus
        if (
            this.open &&
            !e.relatedTarget &&
            (e.target as HTMLElement).nodeName === 'BUTTON'
        ) {
            const targetValue = (e.target as HTMLElement).getAttribute('value');
            if (!this.filteredOptions.find((o) => o.value === targetValue)) {
                this.inputElement?.focus();
            }
        } else {
            this.open = false;
        }
    };

    private onKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.moveFocus('down', target);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.moveFocus('up', target);
                break;
            case 'Tab': {
                if (target.nodeName === 'BUTTON') {
                    e.preventDefault();
                    this.moveFocus(e.shiftKey ? 'up' : 'down', target);
                }
                break;
            }
            case 'Escape': {
                e.preventDefault();
                this.open = false;
                break;
            }
            case 'Enter': {
                if (
                    target.nodeName === 'INPUT' &&
                    this.filteredOptions.length
                ) {
                    e.preventDefault();
                    this.onChange([
                        ...this.value,
                        this.filteredOptions[0].value,
                    ]);
                }
                break;
            }
        }
    };

    private moveFocus = (
        direction: 'up' | 'down',
        currentFocus: HTMLElement,
    ) => {
        if (!this.inputElement || !this.listElement) return;
        const items = Array.from(this.listElement.querySelectorAll('button'));
        const lastIndex = items.length - 1;

        // nothing left to focus
        if (!items.length) {
            this.inputElement.focus();
            return;
        }

        // currently focusing on input element
        if (currentFocus === this.inputElement) {
            if (direction === 'down') {
                items[0].focus();
            } else {
                items[lastIndex].focus();
            }
            return;
        }

        const index = items.indexOf(currentFocus as HTMLButtonElement);

        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === lastIndex)
        ) {
            this.inputElement.focus();
            return;
        }

        if (direction === 'up') {
            items[index - 1].focus();
            return;
        }

        items[index + 1].focus();
        return;
    };

    private clickOption = (value: string) => () => {
        if (this.value.includes(value)) {
            this.onChange(this.value.filter((v) => v === value));
        } else {
            this.onChange([...this.value, value]);
        }
    };

    private onChangeInput = (e: any) => {
        this.open = true;
        this.filter = e.target.value;
    };

    private onChange = (value: string[]) => {
        this.fieldchange.emit({
            name: this.name,
            value,
        });

        if (this.closeOnSelect) {
            this.inputElement?.focus();
            this.open = false;
        } else if (this.clearOnSelect) {
            this.filter = '';
        }
    };
}
