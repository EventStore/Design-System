import { Component, h, Host } from '@stencil/core';
import { router } from '@kurrent-ui/router';
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
                <l2-header />
                <l2-sidebar>
                    <l2-layout-section sectionTitle={'My Section'}>
                        <l2-layout-link
                            matchExact
                            url={'/'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Hello!'}
                        </l2-layout-link>
                        <l2-layout-link
                            url={'/preview'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere'}
                        </l2-layout-link>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'My Other Section'}>
                        <l2-layout-link
                            url={'/somewhere-else'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go somewhere else'}
                        </l2-layout-link>
                        <l2-layout-link
                            url={'/home'}
                            icon={[ICON_NAMESPACE, 'dark-high-theme']}
                        >
                            {'Go nowhere'}
                        </l2-layout-link>
                    </l2-layout-section>
                </l2-sidebar>
                <l2-toolbar>
                    <menu>
                        <li>
                            <c2-button>
                                <c2-icon
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                />
                            </c2-button>
                        </li>
                        <li>
                            <c2-button>
                                <c2-icon
                                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                                />
                            </c2-button>
                        </li>
                    </menu>
                </l2-toolbar>
            </Host>
        );
    }
}
