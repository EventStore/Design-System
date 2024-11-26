import { Component, Host, h } from '@stencil/core';
import { router } from '@kurrent-ui/router';

import { Page } from '../../../../';
import { areas } from './validPositions';

/**
 * All sized panel placements
 * @group Sized Panels
 */
@Component({
    tag: 'sized-panel-demo',
    styleUrl: 'sized-panel.demo.css',
    shadow: true,
})
export class PanelPlacementDemo {
    componentWillLoad() {
        router.init({ root: '/sized-panel-demo/' });
    }

    render() {
        return (
            <Host>
                <Page pageTitle={'Sized Panels'}>
                    {'hello'}

                    {areas.map(([area]) => (
                        <l2-sized-panel area={area} key={area}>
                            {area}
                            <img
                                src={`https://picsum.photos/400/200?area=${area}`}
                                height={200}
                                width={400}
                            />
                        </l2-sized-panel>
                    ))}
                </Page>
            </Host>
        );
    }
}
