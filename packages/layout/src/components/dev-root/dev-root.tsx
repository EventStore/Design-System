import { Component, h, Host } from '@stencil/core';

import { Route, router, Switch } from '@eventstore/router';
import { Page } from '../Page/Page';
import { ES_LAYOUT } from '../../icons/namespace';
import { requestClose } from '@eventstore/components';
import { logger } from '../../utils/logger';

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
                    <es-nav navTree={this.navTree} slot={'under'} />
                    <es-header-dropdown
                        disabled
                        slot={'right'}
                        icon={[ES_LAYOUT, 'dark-low-theme']}
                        buttonText={'JJJ'}
                    >
                        <header class={'user_dropdown_header'}>
                            <es-icon icon={[ES_LAYOUT, 'dark-low-theme']} />
                            <h1>{'John John Johnson'}</h1>
                            <h2>{'jjj@johnson.com'}</h2>
                        </header>
                        <es-layout-link
                            matchExact
                            url={'/'}
                            count={22}
                            alertLevel={'error'}
                        >
                            {'Hello!'}
                        </es-layout-link>
                        <es-layout-button
                            onClick={(e) => {
                                logger.log('hello');
                                requestClose(e.target);
                            }}
                            icon={[ES_LAYOUT, 'dark-low-theme']}
                        >
                            {'Go away'}
                        </es-layout-button>
                        <es-layout-link
                            url={'/somewhere'}
                            icon={[ES_LAYOUT, 'dark-high-theme']}
                        >
                            {'Go somewhere'}
                        </es-layout-link>
                    </es-header-dropdown>
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
                            <es-layout-section title={'Dropdown'}>
                                <es-sidebar-dropdown
                                    defaultIcon={[ES_LAYOUT, 'light-low-theme']}
                                    defaultTitle={'Hello there'}
                                >
                                    <es-layout-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Night Time'}
                                    >
                                        <es-layout-button
                                            onClick={(e) => {
                                                logger.log('hello');
                                                requestClose(e.target);
                                            }}
                                            icon={[ES_LAYOUT, 'dark-low-theme']}
                                        >
                                            {'Go away'}
                                        </es-layout-button>
                                        <es-layout-link
                                            matchExact
                                            url={'/'}
                                            icon={[
                                                ES_LAYOUT,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Hello!'}
                                        </es-layout-link>
                                        <es-layout-link
                                            url={'/somewhere'}
                                            icon={[
                                                ES_LAYOUT,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Go somewhere'}
                                        </es-layout-link>
                                    </es-layout-section>
                                    <es-layout-section
                                        collapsable
                                        title={'Day Time'}
                                    >
                                        <es-layout-link
                                            url={'/good-morning'}
                                            icon={[
                                                ES_LAYOUT,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Good morning!'}
                                        </es-layout-link>
                                        <es-layout-link
                                            url={'/work'}
                                            icon={[
                                                ES_LAYOUT,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Go to work'}
                                        </es-layout-link>
                                    </es-layout-section>
                                    <es-layout-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Another Time'}
                                    >
                                        {Array.from({ length: 200 }, (_, i) => (
                                            <es-layout-link
                                                url={`/another-${i}`}
                                                icon={[
                                                    ES_LAYOUT,
                                                    'light-low-theme',
                                                ]}
                                            >
                                                {`Link ${1}`}
                                            </es-layout-link>
                                        ))}
                                    </es-layout-section>
                                </es-sidebar-dropdown>
                            </es-layout-section>
                            <es-layout-section title={'My Section'}>
                                <es-layout-link
                                    matchExact
                                    url={'/'}
                                    icon={[ES_LAYOUT, 'dark-high-theme']}
                                >
                                    {'Hello!'}
                                </es-layout-link>
                                <es-layout-button
                                    icon={[ES_LAYOUT, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </es-layout-button>
                                <es-layout-link
                                    url={'/somewhere'}
                                    icon={[ES_LAYOUT, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </es-layout-link>
                            </es-layout-section>
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
