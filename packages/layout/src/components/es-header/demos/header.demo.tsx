import { Component, h, Host, State } from '@stencil/core';
import { Link, router } from '@eventstore-ui/router';

/**
 * Header
 * @group Layout
 */
@Component({
    tag: 'header-demo',
    styleUrl: 'header-demo.css',
    shadow: true,
})
export class Demo {
    @State() showNav = true;

    componentWillLoad() {
        router.init({ root: '/header-demo' });
    }

    render() {
        return (
            <Host>
                <es-header>
                    <Link url={'/'} slot={'left'}>
                        <es-logo />
                    </Link>
                    <es-theme-dropdown slot={'right'} />
                    {this.showNav && (
                        <es-nav
                            navTree={[
                                {
                                    title: 'Link 1',
                                    url: '/a',
                                },
                                {
                                    title: 'Link 2',
                                    url: '/b',
                                },
                                {
                                    title: 'Link 3',
                                    url: '/c',
                                },
                            ]}
                            slot={'under'}
                        />
                    )}
                </es-header>
                <main>
                    <es-button
                        onClick={() => {
                            this.showNav = !this.showNav;
                        }}
                    >
                        {this.showNav ? 'Hide Nav' : 'Show Nav'}
                    </es-button>
                </main>
            </Host>
        );
    }
}
