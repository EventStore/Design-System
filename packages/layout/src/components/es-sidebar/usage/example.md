```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <es-sidebar>
        <es-layout-section sectionTitle={'My Section'}>
            <es-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-layout-link>
            <es-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'My Other Section'}>
            <es-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-layout-link>
            <es-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```
