import { Component, h } from '@stencil/core';

/**
 * Page Title
 */
@Component({
    tag: 'page-title-demo',
    styleUrl: 'page-title-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return <l2-page-title>{'Hello!'}</l2-page-title>;
    }
}
