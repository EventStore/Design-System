import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';

/**
 * A section with an optional title for containing layout-links
 * @part header - The header containing the title.
 * @part title - The title h1 element.
 * @part nav - The nav element.
 * @part nav_inner - The element inside the nav.
 */
@Component({
    tag: 'es-layout-section',
    styleUrl: 'es-layout-section.css',
    shadow: true,
})
export class LayoutSection {
    /** Optionally renders a title */
    @Prop({ attribute: 'title' }) sectionTitle?: string;
    /** If the section is collapsable */
    @Prop() collapsable: boolean = false;
    /** If the section should be collapsed by default */
    @Prop() defaultCollapsed: boolean = false;

    @State() collapsed: boolean = this.defaultCollapsed;

    @Listen('focusin') handleFocusIn() {
        if (!this.collapsable || !this.collapsed) return;
        this.expand();
    }

    render() {
        return (
            <Host>
                {!!this.sectionTitle && (
                    <header
                        class={{
                            collapsable: this.collapsable,
                            collapsed: this.collapsed,
                        }}
                        onClick={this.toggle}
                        role={this.collapsable ? 'button' : undefined}
                        aria-expanded={`${!this.collapsed}`}
                        part={'header'}
                    >
                        <h1 part={'title'}>{this.sectionTitle}</h1>
                        {this.collapsable && (
                            <es-icon
                                icon={[ICON_NAMESPACE, 'chevron']}
                                size={14}
                            />
                        )}
                    </header>
                )}
                <nav
                    part={'nav'}
                    ref={this.captureNav}
                    aria-hidden={`${this.collapsed}`}
                >
                    <div part={'nav_inner'}>
                        <slot />
                    </div>
                </nav>
            </Host>
        );
    }

    private nav?: HTMLElement;
    private captureNav = (ref?: HTMLElement) => {
        this.nav = ref;
    };

    private toggle = () => {
        if (!this.collapsable) return;

        if (this.collapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    };

    private collapse = () => {
        if (!this.nav) return;

        const height = this.nav.scrollHeight;
        this.nav.style.height = `${height}px`;
        this.nav.style.opacity = '1';

        requestAnimationFrame(() => {
            if (!this.nav) return;
            this.nav.style.transitionProperty = 'opacity height';
            this.nav.style.height = '0px';
            this.nav.style.opacity = '0';
        });

        this.collapsed = true;
    };

    private expand = () => {
        if (!this.nav) return;

        // prevent focusing from messing with the scrolltop
        this.nav.scrollTop = 0;

        const transitionEnd = () => {
            if (!this.nav) return;
            if (!this.collapsed) {
                this.nav.style.height = 'auto';
            }
            this.nav.removeEventListener('transitionend', transitionEnd);
        };

        this.nav.addEventListener('transitionend', transitionEnd);

        const height = this.nav.scrollHeight;

        this.nav.style.height = '0px';
        this.nav.style.opacity = '0';
        this.nav.style.transitionProperty = 'opacity height';
        requestAnimationFrame(() => {
            if (!this.nav) return;
            this.nav.style.height = `${height}px`;
            this.nav.style.opacity = '1';
        });

        this.collapsed = false;
    };
}
