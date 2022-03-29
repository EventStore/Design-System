```tsx
import { Link } from '@eventstore/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section>
            <es-layout-link url={'/'}>
                {'My section has no title'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'I am a section'}>
            <es-layout-link url={'/somewhere-else'}>
                {'My section has a title'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```
