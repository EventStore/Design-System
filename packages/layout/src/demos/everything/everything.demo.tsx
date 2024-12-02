import { Component, h, Host, State } from '@stencil/core';

import { Route, router, Switch } from '@kurrent-ui/router';
import { Page, type PageState } from '../../components/Page/Page';
import { ICON_NAMESPACE } from '../../icons/namespace';
import { requestClose } from '@kurrent-ui/components';
import { logger } from '../../utils/logger';

/**
 * Everything Demo
 */
@Component({
    tag: 'everything-demo',
    styleUrl: 'everything.css',
    shadow: true,
})
export class DevRoot {
    @State() pageState: PageState = 'loading';

    componentWillLoad() {
        router.init();
        setTimeout(() => {
            this.pageState = 'ready';
        }, 100);
    }

    render() {
        return (
            <Host>
                <l2-header>
                    <l2-nav navTree={this.navTree} slot={'under'} />
                    <l2-header-dropdown
                        slot={'right'}
                        icon={[ICON_NAMESPACE, 'dark-low-theme']}
                        buttonText={'JJJ'}
                    >
                        <header class={'user_dropdown_header'}>
                            <c2-icon
                                icon={[ICON_NAMESPACE, 'dark-low-theme']}
                            />
                            <h1>{'John John Johnson'}</h1>
                            <h2>{'jjj@johnson.com'}</h2>
                        </header>
                        <l2-layout-link
                            matchExact
                            url={'/'}
                            count={22}
                            alertLevel={'error'}
                        >
                            {'Hello!'}
                        </l2-layout-link>
                        <l2-layout-button
                            onClick={(e) => {
                                logger.log('hello');
                                requestClose(e.target);
                            }}
                            icon={[ICON_NAMESPACE, 'dark-low-theme']}
                        >
                            {'Go away'}
                        </l2-layout-button>
                        <l2-layout-link
                            url={'/somewhere'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere'}
                        </l2-layout-link>
                    </l2-header-dropdown>
                    <l2-theme-dropdown slot={'right'} />
                </l2-header>
                <l2-loading-bar name={'page'} />

                <Switch>
                    <Route url={'/error'}>
                        <Page
                            pageTitle={'Error Test'}
                            state={['error', new Error('Oh no!')]}
                        >
                            <div>{'hello'}</div>
                        </Page>
                    </Route>
                    <Route>
                        <l2-sidebar>
                            <l2-layout-section title={'Dropdown'}>
                                <l2-sidebar-dropdown
                                    defaultIcon={[
                                        ICON_NAMESPACE,
                                        'light-low-theme',
                                    ]}
                                    defaultTitle={'Hello there'}
                                >
                                    <l2-layout-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Night Time'}
                                    >
                                        <l2-layout-button
                                            onClick={(e) => {
                                                logger.log('hello');
                                                requestClose(e.target);
                                            }}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'dark-low-theme',
                                            ]}
                                        >
                                            {'Go away'}
                                        </l2-layout-button>
                                        <l2-layout-link
                                            matchExact
                                            url={'/'}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Hello!'}
                                        </l2-layout-link>
                                        <l2-layout-link
                                            url={'/somewhere'}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Go somewhere'}
                                        </l2-layout-link>
                                    </l2-layout-section>
                                    <l2-layout-section
                                        collapsable
                                        title={'Day Time'}
                                    >
                                        <l2-layout-link
                                            url={'/good-morning'}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Good morning!'}
                                        </l2-layout-link>
                                        <l2-layout-link
                                            url={'/work'}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Go to work'}
                                        </l2-layout-link>
                                    </l2-layout-section>
                                    <l2-layout-section
                                        collapsable
                                        defaultCollapsed
                                        title={'Another Time'}
                                    >
                                        {Array.from({ length: 200 }, (_, i) => (
                                            <l2-layout-link
                                                url={`/another-${i}`}
                                                icon={[
                                                    ICON_NAMESPACE,
                                                    'light-low-theme',
                                                ]}
                                            >
                                                {`Link ${1}`}
                                            </l2-layout-link>
                                        ))}
                                    </l2-layout-section>
                                </l2-sidebar-dropdown>
                            </l2-layout-section>
                            <l2-layout-section title={'My Section'}>
                                <l2-layout-link
                                    matchExact
                                    url={'/'}
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Hello!'}
                                </l2-layout-link>
                                <l2-layout-button
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </l2-layout-button>
                                <l2-layout-link
                                    url={'/somewhere'}
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </l2-layout-link>
                            </l2-layout-section>
                        </l2-sidebar>
                        <Switch>
                            <Route exact url={'/'}>
                                <Page
                                    pageTitle={'Home'}
                                    state={this.pageState}
                                    renderLoadingState={false}
                                >
                                    <div class={'padder'} />
                                    {'hello'}
                                    <div class={'padder'} />
                                    <l2-toolbar>
                                        <menu>
                                            <li>
                                                <c2-button>
                                                    <c2-icon
                                                        icon={[
                                                            ICON_NAMESPACE,
                                                            'dark-high-theme',
                                                        ]}
                                                    />
                                                </c2-button>
                                            </li>
                                            <li>
                                                <c2-button>
                                                    <c2-icon
                                                        icon={[
                                                            ICON_NAMESPACE,
                                                            'light-high-theme',
                                                        ]}
                                                    />
                                                </c2-button>
                                            </li>
                                        </menu>
                                    </l2-toolbar>
                                    <l2-panel>
                                        <l2-panel-header>
                                            {'Hello there'}
                                            <c2-button
                                                variant={'minimal'}
                                                slot={'actions'}
                                            >
                                                <c2-icon
                                                    icon={[
                                                        ICON_NAMESPACE,
                                                        'dark-high-theme',
                                                    ]}
                                                    size={20}
                                                />
                                            </c2-button>
                                            <c2-button
                                                variant={'minimal'}
                                                slot={'actions'}
                                            >
                                                <c2-icon
                                                    icon={[
                                                        ICON_NAMESPACE,
                                                        'light-high-theme',
                                                    ]}
                                                    size={20}
                                                />
                                            </c2-button>
                                        </l2-panel-header>
                                    </l2-panel>
                                </Page>
                            </Route>
                            <Route url={'/somewhere'}>
                                <Page
                                    pageTitle={'Somewhere'}
                                    state={this.pageState}
                                    renderLoadingState={false}
                                >
                                    <div>{'Welcome to somewhere'}</div>
                                </Page>
                            </Route>
                            <Route url={'/something'}>
                                <Page
                                    pageTitle={'something'}
                                    state={this.pageState}
                                    renderLoadingState={false}
                                >
                                    <div>{'Welcome to something'}</div>
                                    <c2-button-link url={'/something/deeper'}>
                                        {'Go Deeper'}
                                    </c2-button-link>
                                </Page>
                            </Route>
                            <Route>
                                <Page
                                    pageTitle={'404'}
                                    state={this.pageState}
                                    renderLoadingState={false}
                                >
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
