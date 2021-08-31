```tsx
import { createWorkingData, createWorkingDataArray } from '@eventstore/fields';

interface Example {
    names: string[];
}

const workingData = createWorkingData<Example>({
    names: createWorkingDataArray({
        initialValue: ['John', ''],
        name: 'names',
    }),
});

export default () => (
    <es-input-list
        label={'Names'}
        placeholder={'Add a name to your list'}
        {...workingData.connect('names')}
    />
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
