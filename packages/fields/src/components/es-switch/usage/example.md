```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    good: boolean;
}

const workingData = createWorkingData<Example>({
    good: false,
});

export default () => (
    <>
        <es-switch label={'Text'} {...workingData.connect('good')} />
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
