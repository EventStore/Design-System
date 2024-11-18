import { Component, h, Host } from '@stencil/core';
import { ES_COMPONENTS_ICON_NAMESPACE } from '../../..';

/** Callout */
@Component({
    tag: 'es-callout-demo',
    styleUrl: './callout-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <es-callout variant={'tip'} heading={'Daily tip.'}>
                    <p>{"Don't forget to feed your cat."}</p>
                    <es-button>{'Click me'}</es-button>
                </es-callout>
                <es-callout variant={'info'} heading={'For your information.'}>
                    <p>{'A cow-bison hybrid is called a beefalo.'}</p>
                    <es-button>{'Click me'}</es-button>
                </es-callout>
                <es-callout variant={'warning'} heading={'Beware.'}>
                    <p>{'There is danger ahead.'}</p>
                    <es-button>{'Click me'}</es-button>
                </es-callout>
                <es-callout
                    variant={'error'}
                    heading={'We have an error here.'}
                >
                    <p>{'Something has gone horribly wrong.'}</p>
                    <es-button>{'Click me'}</es-button>
                </es-callout>
                <es-callout
                    class={'custom'}
                    icon={[ES_COMPONENTS_ICON_NAMESPACE, 'trash']}
                    heading={'I am custom.'}
                >
                    <p>{'Check the css to see the customisations'}</p>
                    <es-button>{'Click me'}</es-button>
                </es-callout>
            </Host>
        );
    }
}
