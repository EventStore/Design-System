import { Component, h, Host } from '@stencil/core';

import { Route, router, Switch } from '@eventstore/router';
import { Page } from '../Page/Page';
import { ES_LAYOUT } from '../../icons/namespace';

/** @internal */
@Component({
    tag: 'dev-root',
    styleUrl: 'dev-root.css',
    shadow: true,
})
export class DevRoot {
    componentWillLoad() {
        router.init();
    }

    render() {
        return (
            <Host>
                <es-header>
                    <es-nav navTree={this.navTree} slot={'right'} />
                    <es-theme-dropdown slot={'right'} />
                </es-header>
                <es-loading-bar name={'page'} />

                <Switch>
                    <Route url={'/error'}>
                        <Page
                            pageTitle={'Error Test'}
                            state={new Error('Oh no!')}
                        >
                            <div>{'hello'}</div>
                        </Page>
                    </Route>
                    <Route>
                        <es-sidebar>
                            <es-sidebar-section title={'Dropdown'}>
                                <es-sidebar-dropdown
                                    defaultIcon={[ES_LAYOUT, 'light-low-theme']}
                                    defaultTitle={'Hello there'}
                                >
                                    <es-sidebar-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Night Time'}
                                    >
                                        <es-sidebar-link
                                            matchExact
                                            url={'/'}
                                            icon={[
                                                ES_LAYOUT,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Hello!'}
                                        </es-sidebar-link>
                                        <es-sidebar-link
                                            url={'/somewhere'}
                                            icon={[
                                                ES_LAYOUT,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Go somewhere'}
                                        </es-sidebar-link>
                                    </es-sidebar-section>
                                    <es-sidebar-section
                                        collapsable
                                        title={'Day Time'}
                                    >
                                        <es-sidebar-link
                                            url={'/good-morning'}
                                            icon={[
                                                ES_LAYOUT,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Good morning!'}
                                        </es-sidebar-link>
                                        <es-sidebar-link
                                            url={'/work'}
                                            icon={[
                                                ES_LAYOUT,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Go to work'}
                                        </es-sidebar-link>
                                    </es-sidebar-section>
                                    <es-sidebar-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Another Time'}
                                    >
                                        {Array.from({ length: 200 }, (_, i) => (
                                            <es-sidebar-link
                                                url={`/another-${i}`}
                                                icon={[
                                                    ES_LAYOUT,
                                                    'light-low-theme',
                                                ]}
                                            >
                                                {`Link ${1}`}
                                            </es-sidebar-link>
                                        ))}
                                    </es-sidebar-section>
                                </es-sidebar-dropdown>
                            </es-sidebar-section>
                            <es-sidebar-section title={'My Section'}>
                                <es-sidebar-link
                                    matchExact
                                    url={'/'}
                                    icon={[ES_LAYOUT, 'dark-high-theme']}
                                >
                                    {'Hello!'}
                                </es-sidebar-link>
                                <es-sidebar-link
                                    url={'/somewhere'}
                                    icon={[ES_LAYOUT, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </es-sidebar-link>
                            </es-sidebar-section>
                        </es-sidebar>
                        <Switch>
                            <Route exact url={'/'}>
                                <Page pageTitle={'Home'}>
                                    <div class={'padder'} />
                                    {'hello'}
                                    <div class={'padder'} />
                                </Page>
                            </Route>
                            <Route url={'/somewhere'}>
                                <Page pageTitle={'Somewhere'}>
                                    <div>{'Welcome to somewhere'}</div>
                                </Page>
                            </Route>
                            <Route>
                                <Page pageTitle={'404'}>
                                    <div>{'404'}</div>
                                </Page>
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </Host>
        );
    }

    private navTree = [
        { title: 'Level 0a', url: '/something' },
        {
            title: 'Level 0b',
            children: [
                {
                    title: 'Error Test',
                    url: '/error',
                },
                {
                    title: 'Level 1b',
                    children: [
                        {
                            title: 'Level 2a',
                            url: '/someaaaathing',
                        },
                        {
                            title: 'Level 2b',
                            url: '/baaaaye',
                            disabled: true,
                        },
                        {
                            title: 'Level 3c',
                            url: '/bfffye',
                        },
                    ],
                },
                {
                    title: 'Level 1c',
                    url: '/bye',
                    disabled: true,
                },
            ],
        },
        {
            title: 'Level 0 c',
            children: [
                {
                    title: 'Level 01c',
                    children: [
                        {
                            title: 'Level 1a',
                            url: '/somfewfething',
                        },
                        {
                            title: 'Level 1b',
                            url: '/byasdasdasde',
                        },
                        {
                            title: 'Level 1c',
                            url: '/asssad',
                        },
                    ],
                },
                {
                    title: 'Level 0b',
                    children: [
                        {
                            title: 'Level 1a',
                            url: '/somethffffing',
                        },
                        {
                            title: 'Level 1b',
                            url: '/helloadsa',
                        },
                        {
                            title: 'Level 1c',
                            url: '/byasdasde',
                        },
                    ],
                },
            ],
        },
    ];
}
