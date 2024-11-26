import {
    Component,
    Host,
    h,
    type FunctionalComponent,
    Fragment,
} from '@stencil/core';
import { router } from '@eventstore-ui/router';

import { Page, K_LAYOUT_ICON_NAMESPACE } from '../../../../';

/**
 * All panel placements
 * @group Panels
 */
@Component({
    tag: 'panel-all-demo',
    styleUrl: 'panel-all.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    componentWillLoad() {
        router.init({ root: '/panel-all-demo/' });
    }

    render() {
        return (
            <Host>
                <Page pageTitle={'All Panels'}>
                    {'hello'}
                    <l2-panel area={'header'}>
                        <Inner>{'Header Panel'}</Inner>
                    </l2-panel>
                    <l2-panel area={'cookie'}>
                        <Inner>{'Cookie Panel'}</Inner>
                    </l2-panel>
                    <l2-panel>
                        <Inner>{'Panel Panel'}</Inner>
                    </l2-panel>
                    <l2-panel area="banner">
                        <Inner>{'Banner Panel'}</Inner>
                    </l2-panel>
                    <l2-panel area="sidebar">
                        <Inner>{'Sidebar Panel'}</Inner>
                    </l2-panel>
                    <l2-panel area="toolbar">
                        <Inner>{'Toolbar Panel'}</Inner>
                    </l2-panel>
                </Page>
            </Host>
        );
    }
}

const Inner: FunctionalComponent = (_, children) => (
    <>
        <l2-panel-header>
            {children}
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                    size={20}
                />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon
                    icon={[K_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                    size={20}
                />
            </es-button>
        </l2-panel-header>
        <p>{'Some content'}</p>
    </>
);
