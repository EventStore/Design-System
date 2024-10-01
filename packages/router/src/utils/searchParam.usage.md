<!-- show-location -->

```tsx
import { searchParam } from '@eventstore-ui/router';

const myParam = searchParam('hello');

export default () => (
    <f2-text-field
        label={'Hello'}
        documentation={'Set the hello parameter'}
        placeholder={'There'}
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
