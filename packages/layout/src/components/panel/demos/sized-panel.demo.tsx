import { Component, Host, h } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import { Page } from '../../../../';
import { areas } from './validPositions';

/**
 * es-sized-panel example
 */
@Component({
    tag: 'es-sized-panel-demo',
    styleUrl: 'sized-panel.demo.css',
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
                <Page pageTitle={'Sized Panels'}>
                    {'hello'}

                    {areas.map(([area]) => (
                        <es-sized-panel area={area} key={area}>
                            {area}
                            <img
                                src={`https://picsum.photos/400/200?area=${area}`}
                                height={200}
                                width={400}
                            />
                        </es-sized-panel>
                    ))}
                </Page>
            </Host>
        );
    }
}
