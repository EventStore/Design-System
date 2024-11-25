import { Component, h } from '@stencil/core';

/** Sequence */
@Component({
    tag: 'sequence-demo',
    shadow: true,
})
export class Demo {
    render() {
        return <kurrent-sequence number={6} />;
    }
}
