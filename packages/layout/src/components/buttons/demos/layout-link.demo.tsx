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
                <l2-sidebar>
                    <l2-layout-section sectionTitle={'Links'}>
                        <l2-layout-link url={'/no-icon-1'}>
                            {'Example link'}
                        </l2-layout-link>
                        <l2-layout-link url={'/preview'}>
                            {'I am active'}
                        </l2-layout-link>
                        <l2-layout-link url={'/no-icon-1'}>
                            {'Example link'}
                        </l2-layout-link>
                        <l2-layout-link disabled url={'/no-icon-2'}>
                            {'Disabled example  '}
                        </l2-layout-link>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'With Icon'}>
                        <l2-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'With Icon'}
                        </l2-layout-link>
                        <l2-layout-link
                            disabled
                            url={'/icon-2'}
                            icon={this.randomIcon()}
                        >
                            {'Disabled'}
                        </l2-layout-link>
                        <l2-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Another'}
                        </l2-layout-link>
                        <l2-layout-link
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'More Icon'}
                        </l2-layout-link>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'Alert levels'}>
                        <l2-layout-link
                            alertLevel={'error'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Error'}
                        </l2-layout-link>
                        <l2-layout-link
                            alertLevel={'warning'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Warning'}
                        </l2-layout-link>
                        <l2-layout-link
                            alertLevel={'okay'}
                            url={'/icon-1'}
                            icon={this.randomIcon()}
                        >
                            {'Okay'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} count={12}>
                            {'Counter'}
                        </l2-layout-link>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'Level Example'}>
                        <l2-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={2}>
                            {'Level 2'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={3}>
                            {'Level 3'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={3}>
                            {'Level 3'}
                        </l2-layout-link>
                        <l2-layout-link url={'/icon-1'} level={1}>
                            {'Level 1'}
                        </l2-layout-link>
                    </l2-layout-section>
                </l2-sidebar>
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
