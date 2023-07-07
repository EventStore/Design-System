import { Component, h, Host, State } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { Checkpoint } from './types';

/** es-progression demo. */
@Component({
    tag: 'es-progression-demo',
    shadow: true,
})
export class Counter {
    @State() location1: string = '1-1';
    @State() location2: string = '2-1';

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <h1>Basic progression</h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <es-progression
                        checkpoints={this.world1}
                        location={this.location1}
                        onProgressionRequest={(e) => {
                            this.location1 = e.detail;
                        }}
                    />
                </div>
                <h1>Custom Icons and colours</h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <es-progression
                        checkpoints={this.world1}
                        location={this.location1}
                        icons={{
                            complete: [ICON_NAMESPACE, 'check'],
                            active: [ICON_NAMESPACE, 'spinner'],
                        }}
                        colors={{
                            complete: 'orange',
                        }}
                        onProgressionRequest={(e) => {
                            this.location1 = e.detail;
                        }}
                    />
                </div>
                <h1>Icons and colours per checkpoint</h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <es-progression
                        checkpoints={this.world2}
                        location={this.location2}
                        onProgressionRequest={(e) => {
                            this.location2 = e.detail;
                        }}
                    />
                </div>
            </Host>
        );
    }

    private world1: Checkpoint[] = [
        {
            id: '1-1',
            title: 'Overworld',
        },
        {
            id: '1-2',
            title: 'Underground',
        },
        {
            id: '1-3',
            title: 'Athletic',
        },
        {
            id: '1-4',
            title: 'Castle',
        },
    ];

    private world2: Checkpoint[] = [
        {
            id: '2-1',
            title: 'Overworld',
            color(state) {
                switch (state) {
                    case 'active':
                        return 'red';
                    case 'complete':
                        return 'orange';
                }
            },
            icon(state) {
                switch (state) {
                    case 'active':
                        return [ICON_NAMESPACE, 'spinner'];
                    case 'complete':
                        return [ICON_NAMESPACE, 'check'];
                }
            },
        },
        {
            id: '2-2',
            title: 'Underwater',
            color() {
                return 'aquamarine';
            },
        },
        {
            id: '2-3',
            title: 'Athletic',
            icon(state) {
                switch (state) {
                    case 'inactive':
                        return [ICON_NAMESPACE, 'close'];
                    case 'active':
                        return [ICON_NAMESPACE, 'lightbulb'];
                    case 'complete':
                        return [ICON_NAMESPACE, 'check'];
                }
            },
        },
        {
            id: '2-4',
            title: 'Castle',
        },
    ];
}
