import { router } from '@eventstore-ui/router';
import { Component, h } from '@stencil/core';

/** Breadcrumb */
@Component({
    tag: 'breadcrumb-demo',
    styleUrl: 'breadcrumb-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/breadcrumb-demo' });
    }

    render() {
        return (
            <es-breadcrumb
                noValidate
                crumbs={[
                    { name: 'This', path: './this' },
                    { name: 'Is a', path: './is/a' },
                    {
                        name: 'Breadcrumb',
                        path: './breadcrumb',
                    },
                ]}
            />
        );
    }
}
