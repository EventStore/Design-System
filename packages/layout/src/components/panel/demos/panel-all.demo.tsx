import {
    Component,
    Host,
    h,
    type FunctionalComponent,
    Fragment,
} from '@stencil/core';
import { router } from '@eventstore-ui/router';

import { Page, ES_LAYOUT_ICON_NAMESPACE } from '../../../../';

/**
 * es-panel-placement
 */
@Component({
    tag: 'es-panel-all-demo',
    styleUrl: 'panel-all.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    componentWillLoad() {
        router.init({ root: '/es-panel-all-demo/' });
    }

    render() {
        return (
            <Host>
                <es-header>
                    <es-theme-dropdown slot={'right'} />
                </es-header>
                <Page pageTitle={'All Panels'}>
                    {'hello'}
                    <es-panel area={'cookie'}>
                        <Inner>{'Cookie Panel'}</Inner>
                    </es-panel>
                    <es-panel>
                        <Inner>{'Panel Panel'}</Inner>
                    </es-panel>
                    <es-panel area="banner">
                        <Inner>{'Banner Panel'}</Inner>
                    </es-panel>
                    <es-panel area="sidebar">
                        <Inner>{'Sidebar Panel'}</Inner>
                    </es-panel>
                    <es-panel area="toolbar">
                        <Inner>{'Toolbar Panel'}</Inner>
                    </es-panel>
                </Page>
            </Host>
        );
    }
}

const Inner: FunctionalComponent = (_, children) => (
    <>
        <es-panel-header>
            {children}
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'dark-high-theme']}
                    size={20}
                />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon
                    icon={[ES_LAYOUT_ICON_NAMESPACE, 'light-high-theme']}
                    size={20}
                />
            </es-button>
        </es-panel-header>
        <p>{'Some content'}</p>
    </>
);
