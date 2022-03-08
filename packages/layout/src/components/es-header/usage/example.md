```tsx
import { Link } from '@eventstore/router';

export default () => (
    <es-header>
        <Link url={'/'} slot={'left'}>
            <es-logo />
        </Link>
        <es-theme-dropdown slot={'right'} />
        <es-nav
            navTree={[
                {
                    title: 'Link 1',
                    url: '/a',
                },
                {
                    title: 'Link 2',
                    url: '/b',
                },
                {
                    title: 'Link 3',
                    url: '/c',
                },
            ]}
            slot={'under'}
        />
    </es-header>
);
```
