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
                <es-sidebar>
                    <es-layout-section sectionTitle={'Buttons'}>
                        <es-layout-button onClick={logger.log}>
                            {'Example button'}
                        </es-layout-button>
                        <es-layout-button active onClick={logger.log}>
                            {'I am active'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log}>
                            {'Example button'}
                        </es-layout-button>
                        <es-layout-button disabled onClick={logger.log}>
                            {'Disabled example  '}
                        </es-layout-button>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'With Icon'}>
                        <es-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'With Icon'}
                        </es-layout-button>
                        <es-layout-button
                            disabled
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Disabled'}
                        </es-layout-button>
                        <es-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Another'}
                        </es-layout-button>
                        <es-layout-button
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'More Icon'}
                        </es-layout-button>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'Alert levels'}>
                        <es-layout-button
                            alertLevel={'error'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Error'}
                        </es-layout-button>
                        <es-layout-button
                            alertLevel={'warning'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Warning'}
                        </es-layout-button>
                        <es-layout-button
                            alertLevel={'okay'}
                            onClick={logger.log}
                            icon={this.randomIcon()}
                        >
                            {'Okay'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} count={12}>
                            {'Counter'}
                        </es-layout-button>
                    </es-layout-section>
                    <es-layout-section sectionTitle={'Level Example'}>
                        <es-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={2}>
                            {'Level 2'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={3}>
                            {'Level 3'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={3}>
                            {'Level 3'}
                        </es-layout-button>
                        <es-layout-button onClick={logger.log} level={1}>
                            {'Level 1'}
                        </es-layout-button>
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
