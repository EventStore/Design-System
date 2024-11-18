import { Component, h } from '@stencil/core';
import type { Tab } from '../types';

/** Tabs */
@Component({
    tag: 'es-tabs-demo',
    styleUrl: './tabs-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <es-tabs tabs={this.tabs} activeParam={false}>
                <p slot={'tab-1'}>{'I am in tab 1'}</p>
                <p slot={'tab-2'}>{'Welcome to tab 2!'}</p>
                <p slot={'tab-3'}>{'Hello 👋. You have reached tab 3.'}</p>
                <p slot={'tab-4'}>{'Tab 4 now'}</p>
                <p slot={'tab-4'}>{"I'm also in tab 4."}</p>
            </es-tabs>
        );
    }

    private tabs: Tab[] = [
        {
            id: 'tab-1',
            title: 'One',
        },
        {
            id: 'tab-2',
            title: 'Two',
            badge: () => true,
        },
        {
            id: 'tab-3',
            title: 'Three',
        },
        {
            id: 'tab-4',
            title: 'Four',
        },
    ];
}
