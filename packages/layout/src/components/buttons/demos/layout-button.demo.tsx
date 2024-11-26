import { Component, h, Host } from '@stencil/core';
import { logger } from '../../../utils/logger';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { IconDescription } from '@eventstore-ui/components';

/**
 * Layout Button
 * @group Buttons
 */
@Component({
    tag: 'layout-button-demo',
    styleUrl: './layout-button-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <l2-sidebar>
                    <l2-layout-section sectionTitle={'Buttons'}>
                        <l2-layout-button onClick={logger.log}>
                            {'Example button'}
                        </l2-layout-button>
                        <l2-layout-button active onClick={logger.log}>
                            {'I am active'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log}>
                            {'Example button'}
                        </l2-layout-button>
                        <l2-layout-button disabled onClick={logger.log}>
                            {'Disabled example  '}
                        </l2-layout-button>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'With Icon'}>
                        <l2-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'With Icon'}
                        </l2-layout-button>
                        <l2-layout-button
                            disabled
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Disabled'}
                        </l2-layout-button>
                        <l2-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Another'}
                        </l2-layout-button>
                        <l2-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'More Icon'}
                        </l2-layout-button>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'Alert levels'}>
                        <l2-layout-button
                            alertLevel={'error'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Error'}
                        </l2-layout-button>
                        <l2-layout-button
                            alertLevel={'warning'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Warning'}
                        </l2-layout-button>
                        <l2-layout-button
                            alertLevel={'okay'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Okay'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} count={12}>
                            {'Counter'}
                        </l2-layout-button>
                    </l2-layout-section>
                    <l2-layout-section sectionTitle={'Level Example'}>
                        <l2-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={3}>
                            {'Level 3'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={3}>
                            {'Level 3'}
                        </l2-layout-button>
                        <l2-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </l2-layout-button>
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
