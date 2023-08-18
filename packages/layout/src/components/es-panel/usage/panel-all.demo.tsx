import { Component, Host, h } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import { Page, ES_LAYOUT_ICON_NAMESPACE } from '../../../';

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
                        <es-panel-header>
                            {'Cookie panel'}
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'dark-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'light-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                        </es-panel-header>
                    </es-panel>
                    <es-panel start={'edge'} end={'edge'}>
                        <es-panel-header>
                            {'Panel panel'}
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'dark-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'light-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                        </es-panel-header>
                    </es-panel>
                    <es-panel area="banner">
                        <es-panel-header>
                            {'Banner panel'}
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'dark-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'light-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                        </es-panel-header>
                    </es-panel>
                    <es-panel area="sidebar">
                        <es-panel-header>
                            {'Sidebar panel'}
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'dark-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'light-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                        </es-panel-header>
                    </es-panel>
                    <es-panel area="toolbar">
                        <es-panel-header>
                            {'Toolbar panel'}
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'dark-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                            <es-button variant={'minimal'} slot={'actions'}>
                                <es-icon
                                    icon={[
                                        ES_LAYOUT_ICON_NAMESPACE,
                                        'light-high-theme',
                                    ]}
                                    size={20}
                                />
                            </es-button>
                        </es-panel-header>
                    </es-panel>
                </Page>
            </Host>
        );
    }
}
