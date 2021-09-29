```tsx
import { Tab } from '@eventstore/components';

const tabs: Tab[] = [
    {
        id: 'tab-1',
        title: 'One',
    },
    {
        id: 'tab-2',
        title: 'Two',
        badge: () => true,
    },
    {
        id: 'tab-3',
        title: 'Three',
    },
    {
        id: 'tab-4',
        title: 'Four',
    },
];

export default () => (
    <es-tabs tabs={tabs} activeParam={false}>
        <p slot={'tab-1'}>{'I am in tab 1'}</p>
        <p slot={'tab-2'}>{'Welcome to tab 2!'}</p>
        <p slot={'tab-3'}>{'Hello 👋. You have reached tab 3.'}</p>
        <es-input slot={'tab-4'} value={'Hello'} label={'My Field'} />
        <es-input
            slot={'tab-4'}
            value={'Welcome to tab four'}
            label={'Our Field'}
        />
    </es-tabs>
);
```