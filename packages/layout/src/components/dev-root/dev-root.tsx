import { Component, h, Host } from '@stencil/core';

import { router } from '@eventstore/router';
import { Page } from '../Page/Page';

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
                    <es-theme-dropdown slot={'right'} />
                </es-header>
                <es-loading-bar name={'page'} />
                <Page pageTitle={'Test'} state={new Error('Oh no!')}>
                    <div>{'hello'}</div>
                </Page>
            </Host>
        );
    }

    private navTree = [
        { title: 'Level 0a', url: '/something' },
        {
            title: 'Level 0b',
            children: [
                {
                    title: 'Level 1a',
                    url: '/sometasdasdwhing',
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
