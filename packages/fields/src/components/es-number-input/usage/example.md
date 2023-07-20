```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    count: string;
    mice: string;
}

const form = createValidatedForm<Example>({
    count: '',
    mice: {
        initialValue: '',
        validations: [
            {
                validator: (v) => parseInt(v, 10) >= 5,
                message: 'There are at least 5 mice.',
            },
        ],
    },
});

export default () => (
    <>
        <es-number-input
            label={'Count'}
            placeholder={'How high can you count'}
            unit={'n'}
            {...form.connect('count')}
        />
        <es-number-input
            label={'How many mice?'}
            placeholder={'Are there any?'}
            unit={'🐁'}
            {...form.connect('mice')}
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
    </>
);
```

```css
:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

es-button {
    margin-left: auto;
}
```
