import { Component, h, Host, State } from '@stencil/core';
import { K_COMPONENTS_ICON_NAMESPACE } from '../../..';

/** Badge */
@Component({
    tag: 'badge-demo',
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
                <c2-badge color={'error'} count={this.error}>
                    <c2-button onClick={() => (this.error += 1)}>
                        {'Error'}
                    </c2-button>
                </c2-badge>
                <c2-badge color={'warning'} count={this.warning}>
                    <c2-button onClick={() => (this.warning += 1)}>
                        {'Warning'}
                    </c2-button>
                </c2-badge>
                <c2-badge color={'okay'} count={this.okay}>
                    <c2-button onClick={() => (this.okay += 1)}>
                        {'Okay'}
                    </c2-button>
                </c2-badge>
                {/* variants */}
                <c2-badge
                    color={'error'}
                    count={this.error}
                    variant={'outline'}
                >
                    <c2-icon icon={[K_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </c2-badge>
                <c2-badge color={'warning'} count={this.warning} showZero>
                    <c2-icon icon={[K_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </c2-badge>
                <c2-badge color={'okay'} count={this.okay} variant={'minimal'}>
                    <c2-icon icon={[K_COMPONENTS_ICON_NAMESPACE, 'trash']} />
                </c2-badge>
                {/* dot */}
                <c2-badge variant={'dot'} color={'error'} count={this.error}>
                    <c2-button
                        variant={'outline'}
                        onClick={() => (this.error += 1)}
                    >
                        {'Error'}
                    </c2-button>
                </c2-badge>
                <c2-badge
                    variant={'dot'}
                    color={'warning'}
                    count={this.warning}
                >
                    <c2-button
                        variant={'outline'}
                        onClick={() => (this.warning += 1)}
                    >
                        {'Warning'}
                    </c2-button>
                </c2-badge>
                <c2-badge variant={'dot'} color={'okay'} count={this.okay}>
                    <c2-button
                        variant={'outline'}
                        onClick={() => (this.okay += 1)}
                    >
                        {'Okay'}
                    </c2-button>
                </c2-badge>
            </Host>
        );
    }
}
