import { Component, h, Host, State } from '@stencil/core';
import { ES_COMPONENTS_ICON_NAMESPACE } from '../../..';

/** Badge */
@Component({
    tag: 'es-badge-demo',
    styleUrl: './badge-demo.css',
    shadow: true,
})
export class Demo {
    @State() error = 1;
    @State() warning = 0;
    @State() okay = 1000;

    render() {
        return (
            <Host>
                {/* counters */}
                <es-badge color={'error'} count={this.error}>
                    <es-button onClick={() => (this.error += 1)}>
                        {'Error'}
                    </es-button>
                </es-badge>
                <es-badge color={'warning'} count={this.warning}>
                    <es-button onClick={() => (this.warning += 1)}>
                        {'Warning'}
                    </es-button>
                </es-badge>
                <es-badge color={'okay'} count={this.okay}>
                    <es-button onClick={() => (this.okay += 1)}>
                        {'Okay'}
                    </es-button>
                </es-badge>
                {/* variants */}
                <es-badge
                    color={'error'}
                    count={this.error}
                    variant={'outline'}
                >
                    <es-icon icon={[ES_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </es-badge>
                <es-badge color={'warning'} count={this.warning} showZero>
                    <es-icon icon={[ES_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </es-badge>
                <es-badge color={'okay'} count={this.okay} variant={'minimal'}>
                    <es-icon icon={[ES_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </es-badge>
                {/* dot */}
                <es-badge variant={'dot'} color={'error'} count={this.error}>
                    <es-button
                        variant={'outline'}
                        onClick={() => (this.error += 1)}
                    >
                        {'Error'}
                    </es-button>
                </es-badge>
                <es-badge
                    variant={'dot'}
                    color={'warning'}
                    count={this.warning}
                >
                    <es-button
                        variant={'outline'}
                        onClick={() => (this.warning += 1)}
                    >
                        {'Warning'}
                    </es-button>
                </es-badge>
                <es-badge variant={'dot'} color={'okay'} count={this.okay}>
                    <es-button
                        variant={'outline'}
                        onClick={() => (this.okay += 1)}
                    >
                        {'Okay'}
                    </es-button>
                </es-badge>
            </Host>
        );
    }
}
