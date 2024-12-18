import {
    Component,
    h,
    Host,
    Listen,
    Prop,
    State,
    Element,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';

import { bindPanelDetails, type PanelDetails, type PanelMode } from '../panel';
import type { Placement } from '@kurrent-ui/components';

/**
 * A section with an optional title for containing layout-links
 * @part header - The header containing the title.
 * @part title - The title h1 element.
 * @part nav - The nav element.
 * @part nav_inner - The element inside the nav.
 */
@Component({
    tag: 'l2-layout-section',
    styleUrl: 'layout-section.css',
    shadow: true,
})
export class LayoutSection {
    @Element() host!: HTMLL2LayoutSectionElement;

    /** Optionally renders a title */
    @Prop({ attribute: 'title' }) sectionTitle?: string;
    /** If the section is collapsable */
    @Prop() collapsable: boolean = false;
    /** If the section should be collapsed by default */
    @Prop() defaultCollapsed: boolean = false;
    /** If the section should label it's contents with a popover */
    @Prop() autoLabel: boolean | PanelMode = 'collapsed';

    @State() collapsed: boolean = this.defaultCollapsed;
    @State() panelDetails?: PanelDetails;

    @Listen('focusin') handleFocusIn() {
        if (!this.collapsable || !this.collapsed) return;
        this.expand();
    }

    private unbindPanelDetails?: () => void;

    connectedCallback() {
        this.unbindPanelDetails?.();
        this.unbindPanelDetails = bindPanelDetails(
            this.host,
            (PanelDetails) => {
                this.panelDetails = PanelDetails;
            },
        );
    }

    disconnectedCallback() {
        this.unbindPanelDetails?.();
    }

    render() {
        const panelMode = this.panelDetails?.mode ?? 'inline';
        return (
            <Host mode={panelMode}>
                {!!this.sectionTitle && panelMode !== 'collapsed' && (
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
                            <c2-icon
                                icon={[ICON_NAMESPACE, 'chevron']}
                                size={14}
                            />
                        )}
                    </header>
                )}
                <nav
                    part={'nav'}
                    ref={this.captureNav}
                    aria-hidden={`${
                        this.collapsed && panelMode !== 'collapsed'
                    }`}
                >
                    {this.autoLabel === true || this.autoLabel === panelMode ? (
                        <l2-layout-auto-label
                            part={'nav_inner'}
                            placement={this.autoLabelPlacement()}
                        >
                            <slot />
                        </l2-layout-auto-label>
                    ) : (
                        <div part={'nav_inner'}>
                            <slot />
                        </div>
                    )}
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

    private foldFrame!: ReturnType<typeof requestAnimationFrame>;

    private collapse = () => {
        if (!this.nav) return;

        const height = this.nav.scrollHeight;
        this.nav.style.height = `${height}px`;
        this.nav.style.opacity = '1';

        cancelAnimationFrame(this.foldFrame);
        this.foldFrame = requestAnimationFrame(() => {
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
        cancelAnimationFrame(this.foldFrame);
        this.foldFrame = requestAnimationFrame(() => {
            if (!this.nav) return;
            this.nav.style.height = `${height}px`;
            this.nav.style.opacity = '1';
        });

        this.collapsed = false;
    };

    private autoLabelPlacement = (): Placement => {
        switch (this.panelDetails?.area) {
            case 'banner':
                return 'bottom';
            case 'cookie':
            case 'panel':
                return 'top';
            case 'sidebar':
                return 'right';
            case 'toolbar':
            default:
                return 'left';
        }
    };
}
