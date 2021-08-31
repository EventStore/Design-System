```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    enabled: boolean;
}

const workingData = createWorkingData<Example>({
    enabled: false,
});

export default () => (
    <es-checkbox {...workingData.connect('enabled')}>
        {'I agree to the terms and conditions?'}
    </es-checkbox>
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
