import { Component, h, Element, Prop } from '@stencil/core';
import type { IconDescription } from '../../es-icon/types';

/**
 * A link action.
 * @slot - The label for the action, applied to the link, or shown in a dropdown.
 */
@Component({
    tag: 'es-action-link',
    styleUrl: '../action.css',
    shadow: true,
})
export class ESActionLink {
    @Element() host!: HTMLEsActionLinkElement;

    /** If the action is within an `es-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** The url to go to when clicked. */
    @Prop() url!: string;
    /** If the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon!: IconDescription;
    /** If a dot should be shown on the action, to indicate attention being required. */
    @Prop() dot?: HTMLEsBadgeElement['color'];

    render() {
        return (
            <es-button-link
                url={this.url}
                variant={'minimal'}
                disabled={this.disabled}
                title={this.host.textContent ?? undefined}
            >
                <es-badge
                    variant={'dot'}
                    color={this.dot}
                    count={this.dot ? 1 : 0}
                    slot={this.dropdownItem ? 'before' : undefined}
                >
                    <es-icon icon={this.icon} size={20} />
                </es-badge>
                {this.dropdownItem && <slot />}
            </es-button-link>
        );
    }
}
