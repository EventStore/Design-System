```tsx
import type { AccordianSection } from '@eventstore-ui/components';

const sections: AccordianSection[] = [
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
    {
        name: 'section-4',
        title: 'Works with inputs',
        variant: 'field',
        collapsable: true,
    },
];

export default () => (
    <es-accordian sections={sections}>
        <p slot={'section-1'}>{'I am in section 1'}</p>
        <p slot={'section-2'}>{'You can collapse this section'}</p>
        <p slot={'section-3'}>
            {'Hello 👋. You can alt-click to collapse or open all sections.'}
        </p>
        <es-input
            slot={'section-4'}
            value={'hello'}
            label={'My Field'}
            name={'input'}
            placeholder={'hello'}
        />
    </es-accordian>
);
```
