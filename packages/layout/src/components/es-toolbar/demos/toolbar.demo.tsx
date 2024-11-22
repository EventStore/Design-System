import { Component, h, Host } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import { ICON_NAMESPACE } from '../../../icons/namespace';

/**
 * Toolbar
 * @group Layout
 */
@Component({
    tag: 'toolbar-demo',
    styleUrl: 'toolbar-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/toolbar-demo/' });
    }

    render() {
        return (
            <Host>
                <es-header />
                <es-sidebar>
                    <es-layout-section sectionTitle={'My Section'}>
                        <es-layout-link
                            matchExact
                            url={'/'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Hello!'}
                        </es-layout-link>
                        <es-layout-link
                            url={'/preview'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere'}
                        </es-layout-link>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'My Other Section'}>
                        <es-layout-link
                            url={'/somewhere-else'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere else'}
                        </es-layout-link>
                        <es-layout-link
                            url={'/home'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go nowhere'}
                        </es-layout-link>
                    </es-layout-section>
                </es-sidebar>
                <es-toolbar>
                    <menu>
                        <li>
                            <es-button>
                                <es-icon
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                />
                            </es-button>
                        </li>
                        <li>
                            <es-button>
                                <es-icon
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                />
                            </es-button>
                        </li>
                    </menu>
                </es-toolbar>
            </Host>
        );
    }
}
