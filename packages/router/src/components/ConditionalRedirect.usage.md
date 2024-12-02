<!-- show-location -->

```tsx
import { ConditionalRedirect, Link } from '@kurrent-ui/router';

export default () => (
    <>
        <ConditionalRedirect from={'/somewhere'} to={'/elsewhere'} />
        <Link url={'/somewhere'}>{'Go somewhere'}</Link>
    </>
);
```
