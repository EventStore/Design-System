import { Component, h, Host } from '@stencil/core';

import { type AccordianSection } from '../types';

/** Accordian */
@Component({
    tag: 'accordian-demo',
    styleUrl: './accordian-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-accordian sections={this.sections}>
                    <p slot={'section-1'}>{'I am in section 1'}</p>
                    <p slot={'section-2'}>{'You can collapse this section'}</p>
                    <p slot={'section-3'}>
                        {
                            'Hello 👋. You can alt-click to collapse or open all sections.'
                        }
                    </p>
                </c2-accordian>
            </Host>
        );
    }

    private sections: AccordianSection[] = [
        {
            name: 'section-1',
            title: 'Section 1',
            variant: 'text',
        },
        {
            name: 'section-2',
            title: 'Collapsable',
            variant: 'text',
            collapsable: true,
        },
        {
            name: 'section-3',
            title: 'Collapsed by default',
            variant: 'text',
            collapsable: true,
            defaultCollapsed: true,
        },
    ];
}
