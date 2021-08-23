```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    text: string;
}

const workingData = createWorkingData<Example>({
    text: '',
});

const sections = [
    {
        name: 'mega_example',
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
            {...workingData.connect('text')}
        />
        <es-button
            slot={'footer'}
            onClick={() => {
                workingData.submit((data) => {
                    console.log(data);
                });
            }}
        >
            {'Submit'}
        </es-button>
    </es-accordian>
);
```
