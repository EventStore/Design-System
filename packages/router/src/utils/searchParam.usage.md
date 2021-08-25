<!-- show-location -->

```tsx
import { searchParam } from '@eventstore/router';

const myParam = searchParam('hello');

export default () => (
    <es-input
        label={'Hello'}
        placeholder={'Set the hello parameter'}
        name={'hello'}
        value={''}
        onFieldchange={(e) => {
            const { value } = e.detail;
            if (value.length) {
                myParam.set(value);
            } else {
                myParam.delete();
            }
        }}
    />
);
```
