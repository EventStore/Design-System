import { Component, State, h } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import {
    K_LAYOUT_ICON_NAMESPACE,
    Page,
    headerHeight,
    type PanelMode,
} from '../../../../';
import type { TargetableArea } from '../types';

/**
 * Button and link collapsing
 * @group Panels
 */
@Component({
    tag: 'layout-button-collapsed-demo',
    styleUrl: 'layout-button-collapsed.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    @State() mode: Partial<Record<TargetableArea, PanelMode>> = {};

    componentWillLoad() {
        router.init({ root: '/layout-button-collapsed-demo/' });
        headerHeight.set(0);
    }

    render() {
        return (
            <Page pageTitle={'body'}>
                {this.renderPanel('sidebar')}
                {this.renderPanel('toolbar')}
            </Page>
        );
    }

    private renderPanel = (area: TargetableArea) => (
        <l2-panel
            defaultSize={300}
            area={area}
            closedMode={'collapsed'}
            minimumSize={300}
            closedSize={50}
            onModeChange={this.handleModeChange(area)}
        >
            <header class={{ collapsed: this.mode[area] === 'collapsed' }}>
                {this.mode[area] === 'collapsed' ? (
                    <l2-logo mode={'icon'} height={30} width={30} />
                ) : (
                    <l2-logo mode={'full'} height={40} width={164} />
                )}
            </header>
            <l2-layout-hr />
            <l2-layout-section>
                <l2-layout-link
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                    url={'/here'}
                >
                    {'go here'}
                </l2-layout-link>
                <l2-layout-link
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'caret']}
                    url={'/there'}
                >
                    {'go there'}
                </l2-layout-link>
                <l2-layout-link
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                    url={'/up'}
                >
                    {'go up'}
                </l2-layout-link>
                <l2-layout-link
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'dark-low-theme']}
                    url={'/low'}
                >
                    {'go down low'}
                </l2-layout-link>
            </l2-layout-section>
            <l2-layout-hr />
            <l2-layout-section
                autoLabel
                sectionTitle={'Operations'}
                collapsable
            >
                <l2-layout-button
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                >
                    {'click this'}
                </l2-layout-button>
                <l2-layout-button
                    auto-label={'AAAAHHHHHHHHH!'}
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'caret']}
                >
                    {'Auto label different'}
                </l2-layout-button>
                <l2-layout-button
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                >
                    {'click me'}
                </l2-layout-button>
                <l2-layout-button
                    disable-auto-label
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'dark-low-theme']}
                >
                    {'Auto label disabled'}
                </l2-layout-button>
            </l2-layout-section>
        </l2-panel>
    );

    private handleModeChange =
        (area: TargetableArea) => (e: CustomEvent<PanelMode>) => {
            this.mode = { ...this.mode, [area]: e.detail };
        };
}
