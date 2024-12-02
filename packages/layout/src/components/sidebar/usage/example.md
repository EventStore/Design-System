```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-sidebar>
        <l2-layout-section sectionTitle={'My Section'}>
            <l2-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </l2-layout-link>
            <l2-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'My Other Section'}>
            <l2-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </l2-layout-link>
            <l2-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </l2-layout-link>
        </l2-layout-section>
    </l2-sidebar>
);
```
