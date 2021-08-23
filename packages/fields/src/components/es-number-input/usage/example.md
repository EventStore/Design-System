```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    count: string;
    mice: string;
}

const workingData = createWorkingData<Example>({
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

const onEnter = () => {
    workingData.submit((data) => {
        console.log(data);
    });
};

export default () => (
    <>
        <es-number-input
            label={'Count'}
            placeholder={'How high can you count'}
            unit={'n'}
            {...workingData.connect('count')}
        />
        <es-number-input
            label={'How many mice?'}
            placeholder={'Are there any?'}
            unit={'🐁'}
            {...workingData.connect('mice')}
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
