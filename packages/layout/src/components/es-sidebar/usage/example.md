```tsx
import { Link } from '@eventstore/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-sidebar-section sectionTitle={'My Section'}>
            <es-sidebar-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-sidebar-link>
            <es-sidebar-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-sidebar-link>
        </es-sidebar-section>
        <es-sidebar-section sectionTitle={'My Other Section'}>
            <es-sidebar-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-sidebar-link>
            <es-sidebar-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-sidebar-link>
        </es-sidebar-section>
    </es-sidebar>
);
```
