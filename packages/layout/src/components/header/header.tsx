import { Link } from '@kurrent-ui/router';
import { theme } from '@kurrent-ui/theme';
import { Component, h, Host, State } from '@stencil/core';
import { bannerHeight, headerUnderHeight } from '../../utils/LayoutVar';
/**
 * A site header for applications.
 * @slot left - The left of the header. By default shows an eventstore logo, linking to '/'.
 * @slot center - The center of the header. Place some navigational elements.
 * @slot right - The right of the header. Place some navigational elements.
 * @slot under - Underneath the header. Place an l2-nav or other. Automatically sets the `layout-header-under-height` css var with the height of the content.
 * @slot backdrop - Slot an svg to use as a backdrop
 * @part header - The wrapping header element
 * @part left - The left of the header.
 * @part center - The center of the header.
 * @part right - The right of the header.
 * @part under - Underneath the header.
 * @part backdrop - the backdrop container
 */
@Component({
    tag: 'l2-header',
    styleUrl: 'header.css',
    shadow: true,
})
export class Header {
    @State() under: boolean = false;
    @State() backdrop: boolean = false;
    @State() banner: boolean = false;

    private unsubscribe?: () => void;

    componentWillLoad() {
        this.unsubscribe = bannerHeight.observe(this.bannerChange);
        this.underObserver.disconnect();
    }

    disconnectedCallback() {
        this.unsubscribe?.();
        headerUnderHeight.reset();
    }

    render() {
        return (
            <Host
                dark={theme.isDark()}
                high-contrast={theme.isHighContrast()}
                class={{
                    has_under: this.under,
                    has_backdrop: this.backdrop,
                    has_banner: this.banner,
                }}
            >
                <header part={'header'}>
                    <div class={'left'} part={'left'}>
                        <slot name={'left'}>
                            <Link url={'/'} title={'Home'} slot={'left'}>
                                <l2-logo />
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
                    <slot
                        name={'backdrop'}
                        onSlotchange={this.backdropSlotChange}
                    />
                </div>
            </Host>
        );
    }

    private underSlotChange = (e: Event) => {
        if (!e.target) return;
        const target = e.target as HTMLSlotElement;
        const elements = target.assignedElements();

        this.underObserver.disconnect();
        for (const element of elements) {
            this.underObserver.observe(element);
        }

        const totalHeight = elements.reduce(
            (total, element) => total + element.clientHeight,
            0,
        );

        headerUnderHeight.set(totalHeight);
        this.under = totalHeight !== 0;
    };

    private underSizeChange: ResizeObserverCallback = (entries) => {
        let totalHeight = 0;
        for (const {
            borderBoxSize: [size],
        } of entries) {
            totalHeight += size.blockSize;
        }
        headerUnderHeight.set(totalHeight);
        this.under = totalHeight !== 0;
    };
    private underObserver = new ResizeObserver(this.underSizeChange);

    private backdropSlotChange = (e: Event) => {
        if (!e.target) return;
        const target = e.target as HTMLSlotElement;
        this.backdrop = target.assignedElements().length !== 0;
    };

    private bannerChange = (val: number) => {
        this.banner = val > 0;
    };
}
