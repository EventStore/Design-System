import { Component, h, Prop, Element } from '@stencil/core';
import type { IconDescription } from '../../icon/types';

/**
 * A generic button action.
 * @slot - The label for the action, applied to the button, or shown in a dropdown.
 */
@Component({
    tag: 'c2-action',
    styleUrl: '../action.css',
    shadow: true,
})
export class ESActionGeneric {
    @Element() host!: HTMLC2ActionElement;

    /** If the action is within an `c2-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** The action to take when the button is clicked. */
    @Prop() action!: (e: MouseEvent) => any;
    /** If the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon!: IconDescription;
    /** If a dot should be shown on the action, to indicate attention being required. */
    @Prop() dot?: HTMLC2BadgeElement['color'];

    render() {
        return (
            <c2-button
                onClick={this.action}
                variant={'minimal'}
                title={this.host.textContent ?? undefined}
                disabled={this.disabled}
            >
                <c2-badge
                    slot={this.dropdownItem ? 'before' : undefined}
                    variant={'dot'}
                    color={this.dot}
                    count={this.dot ? 1 : 0}
                >
                    <c2-icon icon={this.icon} size={20} />
                </c2-badge>
                {this.dropdownItem && <slot />}
            </c2-button>
        );
    }
}
