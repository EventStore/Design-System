```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    text: string;
}

const workingData = createWorkingData<Example>({
    text: '',
});

export default () => (
    <>
        <es-textarea
            label={'Text'}
            placeholder={'Write some text'}
            {...workingData.connect('text')}
        />
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
```
