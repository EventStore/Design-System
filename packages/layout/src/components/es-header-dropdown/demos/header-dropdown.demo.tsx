import { Component, h, State, Fragment } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import { ICON_NAMESPACE } from '../../../icons/namespace';

/**
 * Header Dropdown
 * @group Layout
 */
@Component({
    tag: 'header-dropdown-demo',
    styleUrl: 'header-dropdown-demo.css',
    shadow: true,
})
export class Demo {
    @State() showNav = true;

    componentWillLoad() {
        router.init({ root: '/header-dropdown-demo' });
    }

    render() {
        return (
            <es-header>
                <es-header-dropdown
                    slot={'right'}
                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                    buttonText={'Highlight'}
                    variant={'highlight'}
                >
                    {this.renderContent()}
                </es-header-dropdown>
                <es-header-dropdown
                    slot={'right'}
                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                    buttonText={'Highlight Disabled'}
                    variant={'highlight'}
                    disabled
                >
                    {this.renderContent()}
                </es-header-dropdown>
                <es-header-dropdown
                    slot={'right'}
                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                    buttonText={'Default'}
                >
                    {this.renderContent()}
                </es-header-dropdown>
                <es-header-dropdown
                    slot={'right'}
                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                    buttonText={'Default Disabled'}
                    disabled
                >
                    {this.renderContent()}
                </es-header-dropdown>
                <es-theme-dropdown slot={'right'} />
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
            </es-header>
        );
    }

    renderContent() {
        return (
            <>
                <header class={'user_dropdown_header'}>
                    <es-icon icon={[ICON_NAMESPACE, 'dark-high-theme']} />
                    <h1>{'John John Johnson'}</h1>
                    <h2>{'jjj@johnson.com'}</h2>
                </header>
                <es-layout-link
                    matchExact
                    url={'/'}
                    count={22}
                    alertLevel={'error'}
                >
                    {'Hello!'}
                </es-layout-link>
                <es-layout-link
                    url={'/somewhere'}
                    icon={[ICON_NAMESPACE, 'dark-high-theme']}
                >
                    {'Go somewhere'}
                </es-layout-link>
            </>
        );
    }
}
