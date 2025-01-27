import { Component, h, Element, Prop } from '@stencil/core';
import type { IconDescription } from '../../icon/types';

/**
 * A link action.
 * @slot - The label for the action, applied to the link, or shown in a dropdown.
 */
@Component({
    tag: 'c2-action-link',
    styleUrl: '../action.css',
    shadow: true,
})
export class ESActionLink {
    @Element() host!: HTMLC2ActionLinkElement;

    /** If the action is within an `c2-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** If the action should display it's text content. */
    @Prop() displayContent = false;
    /** The url to go to when clicked. */
    @Prop() url!: string;
    /** If the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon!: IconDescription;
    /** If a dot should be shown on the action, to indicate attention being required. */
    @Prop() dot?: HTMLC2BadgeElement['color'];

    render() {
        const showContent = this.displayContent || this.dropdownItem;

        return (
            <c2-button-link
                url={this.url}
                variant={'minimal'}
                disabled={this.disabled}
                title={this.host.textContent ?? undefined}
            >
                <c2-badge
                    variant={'dot'}
                    color={this.dot}
                    count={this.dot ? 1 : 0}
                    slot={showContent ? 'before' : undefined}
                >
                    <c2-icon icon={this.icon} size={20} />
                </c2-badge>
                {showContent && <slot />}
            </c2-button-link>
        );
    }
}
