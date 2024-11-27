import { Component, h, Host } from '@stencil/core';
import { K_COMPONENTS_ICON_NAMESPACE } from '../../..';

/** Callout */
@Component({
    tag: 'callout-demo',
    styleUrl: './callout-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-callout variant={'tip'} heading={'Daily tip.'}>
                    <p>{"Don't forget to feed your cat."}</p>
                    <c2-button>{'Click me'}</c2-button>
                </c2-callout>
                <c2-callout variant={'info'} heading={'For your information.'}>
                    <p>{'A cow-bison hybrid is called a beefalo.'}</p>
                    <c2-button>{'Click me'}</c2-button>
                </c2-callout>
                <c2-callout variant={'warning'} heading={'Beware.'}>
                    <p>{'There is danger ahead.'}</p>
                    <c2-button>{'Click me'}</c2-button>
                </c2-callout>
                <c2-callout
                    variant={'error'}
                    heading={'We have an error here.'}
                >
                    <p>{'Something has gone horribly wrong.'}</p>
                    <c2-button>{'Click me'}</c2-button>
                </c2-callout>
                <c2-callout
                    class={'custom'}
                    icon={[K_COMPONENTS_ICON_NAMESPACE, 'trash']}
                    heading={'I am custom.'}
                >
                    <p>{'Check the css to see the customisations'}</p>
                    <c2-button>{'Click me'}</c2-button>
                </c2-callout>
            </Host>
        );
    }
}
