<!-- show-location -->

```tsx
import { Action } from '@eventstore-ui/router';

export default () => (
    <Action
        action={() => {
            console.log('This ran');
        }}
    />
);
```
