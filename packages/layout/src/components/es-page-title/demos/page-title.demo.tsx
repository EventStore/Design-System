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
        return <es-page-title>{'Hello!'}</es-page-title>;
    }
}
