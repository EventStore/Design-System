import { Component, h, Host } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../../icons/namespace';
import { router } from '@eventstore-ui/router';

/**
 * Layout Link
 * @group Buttons
 */
@Component({
    tag: 'layout-link-demo',
    styleUrl: './layout-button-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/layout-link-demo' });
    }
    render() {
        return (
            <Host>
                <es-sidebar>
                    <es-layout-section sectionTitle={'Links'}>
                        <es-layout-link url={'/no-icon-1'}>
                            {'Example link'}
                        </es-layout-link>
                        <es-layout-link url={'/preview'}>
                            {'I am active'}
                        </es-layout-link>
                        <es-layout-link url={'/no-icon-1'}>
                            {'Example link'}
                        </es-layout-link>
                        <es-layout-link disabled url={'/no-icon-2'}>
                            {'Disabled example  '}
                        </es-layout-link>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'With Icon'}>
                        <es-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'With Icon'}
                        </es-layout-link>
                        <es-layout-link
                            disabled
                            url={'/icon-2'}
                            icon={this.randomIcon()}
                        >
                            {'Disabled'}
                        </es-layout-link>
                        <es-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Another'}
                        </es-layout-link>
                        <es-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'More Icon'}
                        </es-layout-link>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'Alert levels'}>
                        <es-layout-link
                            alertLevel={'error'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Error'}
                        </es-layout-link>
                        <es-layout-link
                            alertLevel={'warning'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Warning'}
                        </es-layout-link>
                        <es-layout-link
                            alertLevel={'okay'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Okay'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} count={12}>
                            {'Counter'}
                        </es-layout-link>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'Level Example'}>
                        <es-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={3}>
                            {'Level 3'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={3}>
                            {'Level 3'}
                        </es-layout-link>
                        <es-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </es-layout-link>
                    </es-layout-section>
                </es-sidebar>
            </Host>
        );
    }

    private icons = [
        'caret',
        'chevron',
        'dark-high-theme',
        'dark-low-theme',
        'grip-lines',
        'light-high-theme',
        'light-low-theme',
    ];

    private randomIcon = (): IconDescription => [
        ICON_NAMESPACE,
        this.icons[Math.floor(Math.random() * (this.icons.length - 2))],
    ];
}
