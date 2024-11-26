import { Component, h, Host, State } from '@stencil/core';
import { Link, router } from '@kurrent-ui/router';

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
                <l2-header>
                    <Link url={'/'} slot={'left'}>
                        <l2-logo />
                    </Link>
                    <l2-theme-dropdown slot={'right'} />
                    {this.showNav && (
                        <l2-nav
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
                </l2-header>
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
