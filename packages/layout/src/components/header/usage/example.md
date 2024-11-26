```tsx
import { Link } from '@eventstore-ui/router';

export default () => (
    <l2-header>
        <Link url={'/'} slot={'left'}>
            <l2-logo />
        </Link>
        <l2-theme-dropdown slot={'right'} />
        <l2-nav
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
    </l2-header>
);
```
