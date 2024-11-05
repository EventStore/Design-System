import { Component, State, h } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import {
    ES_LAYOUT_ICON_NAMESPACE,
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
    tag: 'es-layout-button-collapsed-demo',
    styleUrl: 'layout-button-collapsed.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    @State() mode: Partial<Record<TargetableArea, PanelMode>> = {};

    componentWillLoad() {
        router.init({ root: '/es-layout-button-collapsed-demo/' });
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
        <es-panel
            defaultSize={300}
            area={area}
            closedMode={'collapsed'}
            minimumSize={300}
            closedSize={50}
            onModeChange={this.handleModeChange(area)}
        >
            <header class={{ collapsed: this.mode[area] === 'collapsed' }}>
                {this.mode[area] === 'collapsed' ? (
                    <es-logo mode={'icon'} height={30} width={30} />
                ) : (
                    <es-logo mode={'full'} height={40} width={164} />
                )}
            </header>
            <es-layout-hr />
            <es-layout-section>
                <es-layout-link
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                    url={'/here'}
                >
                    {'go here'}
                </es-layout-link>
                <es-layout-link
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'caret']}
                    url={'/there'}
                >
                    {'go there'}
                </es-layout-link>
                <es-layout-link
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                    url={'/up'}
                >
                    {'go up'}
                </es-layout-link>
                <es-layout-link
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'dark-low-theme']}
                    url={'/low'}
                >
                    {'go down low'}
                </es-layout-link>
            </es-layout-section>
            <es-layout-hr />
            <es-layout-section
                autoLabel
                sectionTitle={'Operations'}
                collapsable
            >
                <es-layout-button
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                >
                    {'click this'}
                </es-layout-button>
                <es-layout-button
                    auto-label={'AAAAHHHHHHHHH!'}
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'caret']}
                >
                    {'Auto label different'}
                </es-layout-button>
                <es-layout-button
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                >
                    {'click me'}
                </es-layout-button>
                <es-layout-button
                    disable-auto-label
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'dark-low-theme']}
                >
                    {'Auto label disabled'}
                </es-layout-button>
            </es-layout-section>
        </es-panel>
    );

    private handleModeChange =
        (area: TargetableArea) => (e: CustomEvent<PanelMode>) => {
            this.mode = { ...this.mode, [area]: e.detail };
        };
}
