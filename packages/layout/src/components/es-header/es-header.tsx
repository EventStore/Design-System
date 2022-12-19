import { Link } from '@eventstore-ui/router';
import { theme } from '@eventstore-ui/theme';
import { Component, h, Host, State } from '@stencil/core';
import { headerUnderHeight } from '../../utils/LayoutVar';
/**
 * A site header for applications.
 * @slot left - The left of the header. By default shows an eventstore logo, linking to '/'.
 * @slot center - The center of the header. Place some navigational elements.
 * @slot right - The right of the header. Place some navigational elements.
 * @slot under - Underneath the header. Place an es-nav or other. Automatically sets the `layout-header-under-height` css var with the height of the content.
 * @slot backdrop - Slot an svg to use as a backdrop
 * @part header - The wrapping header element
 * @part left - The left of the header.
 * @part center - The center of the header.
 * @part right - The right of the header.
 * @part under - Underneath the header.
 * @part backdrop - the backdrop container
 */
@Component({
    tag: 'es-header',
    styleUrl: 'es-header.css',
    shadow: true,
})
export class Header {
    @State() under: boolean = false;

    disconnectedCallback() {
        headerUnderHeight.reset();
    }

    render() {
        return (
            <Host
                dark={theme.isDark()}
                high-contrast={theme.isHighContrast()}
                class={{ has_under: this.under }}
            >
                <header part={'header'}>
                    <div class={'left'} part={'left'}>
                        <slot name={'left'}>
                            <Link url={'/'} title={'Home'} slot={'left'}>
                                <es-logo />
                            </Link>
                        </slot>
                    </div>
                    <div class={'center'} part={'center'}>
                        <slot name={'center'} />
                    </div>
                    <div class={'right'} part={'right'}>
                        <slot name={'right'} />
                    </div>
                </header>
                <div class={'under'} part={'under'}>
                    <slot name={'under'} onSlotchange={this.underSlotChange} />
                </div>
                <div class={'backdrop'} part={'backdrop'}>
                    <slot name={'backdrop'} />
                </div>
            </Host>
        );
    }

    private underSlotChange = (e: Event) => {
        if (!e.target) return;
        const target = e.target as HTMLSlotElement;
        const totalHeight = target
            .assignedElements()
            .reduce((total, element) => {
                return total + element.clientHeight;
            }, 0);

        headerUnderHeight.set(totalHeight);
        this.under = totalHeight !== 0;
    };
}
