import { Component, h, Host, State } from '@stencil/core';

import { Route, router, Switch } from '@eventstore-ui/router';
import { Page, type PageState } from '../Page/Page';
import { ICON_NAMESPACE } from '../../icons/namespace';
import { requestClose } from '@eventstore-ui/components';
import { logger } from '../../utils/logger';

/** @internal */
@Component({
    tag: 'dev-root',
    styleUrl: 'dev-root.css',
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
                <es-header>
                    <es-nav navTree={this.navTree} slot={'under'} />
                    <es-header-dropdown
                        slot={'right'}
                        icon={[ICON_NAMESPACE, 'dark-low-theme']}
                        buttonText={'JJJ'}
                        variant={'highlight'}
                    >
                        <header class={'user_dropdown_header'}>
                            <es-icon
                                icon={[ICON_NAMESPACE, 'dark-low-theme']}
                            />
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
                            icon={[ICON_NAMESPACE, 'dark-low-theme']}
                        >
                            {'Go away'}
                        </es-layout-button>
                        <es-layout-link
                            url={'/somewhere'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere'}
                        </es-layout-link>
                    </es-header-dropdown>
                    <es-theme-dropdown slot={'right'} />
                    <svg
                        slot={'backdrop'}
                        width={1920}
                        height={1080}
                        viewBox={'0 0 1280 800'}
                        preserveAspectRatio={'xMidYMin meet'}
                        xmlns={'http://www.w3.org/2000/svg'}
                    >
                        <circle
                            class={'circle_1'}
                            r={1280}
                            cx={1848}
                            cy={400}
                        />
                        <circle
                            class={'circle_2'}
                            r={400}
                            cx={1150}
                            cy={-250}
                        />
                        <circle
                            class={'circle_3'}
                            r={600}
                            cx={-200}
                            cy={1200}
                        />
                    </svg>
                </es-header>
                <es-loading-bar name={'page'} />

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
                        <es-sidebar>
                            <es-layout-section title={'Dropdown'}>
                                <es-sidebar-dropdown
                                    defaultIcon={[
                                        ICON_NAMESPACE,
                                        'light-low-theme',
                                    ]}
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
                                            icon={[
                                                ICON_NAMESPACE,
                                                'dark-low-theme',
                                            ]}
                                        >
                                            {'Go away'}
                                        </es-layout-button>
                                        <es-layout-link
                                            matchExact
                                            url={'/'}
                                            icon={[
                                                ICON_NAMESPACE,
                                                'dark-high-theme',
                                            ]}
                                        >
                                            {'Hello!'}
                                        </es-layout-link>
                                        <es-layout-link
                                            url={'/somewhere'}
                                            icon={[
                                                ICON_NAMESPACE,
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
                                                ICON_NAMESPACE,
                                                'light-high-theme',
                                            ]}
                                        >
                                            {'Good morning!'}
                                        </es-layout-link>
                                        <es-layout-link
                                            url={'/work'}
                                            icon={[
                                                ICON_NAMESPACE,
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
                                                    ICON_NAMESPACE,
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
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Hello!'}
                                </es-layout-link>
                                <es-layout-button
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </es-layout-button>
                                <es-layout-link
                                    url={'/somewhere'}
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                >
                                    {'Go somewhere'}
                                </es-layout-link>
                            </es-layout-section>
                        </es-sidebar>
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
                                    <es-toolbar>
                                        <menu>
                                            <li>
                                                <es-button>
                                                    <es-icon
                                                        icon={[
                                                            ICON_NAMESPACE,
                                                            'dark-high-theme',
                                                        ]}
                                                    />
                                                </es-button>
                                            </li>
                                            <li>
                                                <es-button>
                                                    <es-icon
                                                        icon={[
                                                            ICON_NAMESPACE,
                                                            'light-high-theme',
                                                        ]}
                                                    />
                                                </es-button>
                                            </li>
                                        </menu>
                                    </es-toolbar>
                                    <es-panel>
                                        <es-panel-header>
                                            {'Hello there'}
                                            <es-button
                                                variant={'minimal'}
                                                slot={'actions'}
                                            >
                                                <es-icon
                                                    icon={[
                                                        ICON_NAMESPACE,
                                                        'dark-high-theme',
                                                    ]}
                                                    size={20}
                                                />
                                            </es-button>
                                            <es-button
                                                variant={'minimal'}
                                                slot={'actions'}
                                            >
                                                <es-icon
                                                    icon={[
                                                        ICON_NAMESPACE,
                                                        'light-high-theme',
                                                    ]}
                                                    size={20}
                                                />
                                            </es-button>
                                        </es-panel-header>
                                    </es-panel>
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
                                    <es-button-link url={'/something/deeper'}>
                                        {'Go Deeper'}
                                    </es-button-link>
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
