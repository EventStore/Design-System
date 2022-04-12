```tsx
import { createValidatedForm } from '@eventstore/forms';

interface Example {
    text: string;
}

const form = createValidatedForm<Example>({
    text: '',
});

const sections = [
    {
        name: 'mega_example',
        title: '', // mega inputs are self labeled
        variant: 'mega',
    },
    {
        name: 'mega_disabled',
        title: '', // mega inputs are self labeled
        variant: 'mega',
    },
    {
        name: 'footer',
        title: '',
        variant: 'footer',
    },
];

export default () => (
    <es-accordian sections={sections}>
        <es-mega-input
            slot={'mega_example'}
            label={'Text'}
            placeholder={'Write some text'}
            {...form.connect('text')}
        />
        <es-mega-input
            disabled
            slot={'mega_disabled'}
            label={'Disabled'}
            placeholder={'This is disabled'}
            {...form.connect('text')}
        />
        <es-button
            slot={'footer'}
            onClick={() => {
                form.submit((data) => {
                    console.log(data);
                });
            }}
        >
            {'Submit'}
        </es-button>
    </es-accordian>
);
```
