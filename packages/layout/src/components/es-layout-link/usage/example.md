```tsx
import { Link } from '@eventstore-ui/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section sectionTitle={'Links'}>
            <es-layout-link url={'/no-icon-1'}>{'Example link'}</es-layout-link>
            <es-layout-link url={'/preview'}>{'I am active'}</es-layout-link>
            <es-layout-link url={'/no-icon-1'}>{'Example link'}</es-layout-link>
            <es-layout-link disabled url={'/no-icon-2'}>
                {'Disabled example  '}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'With Icon'}>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'With Icon'}
            </es-layout-link>
            <es-layout-link disabled url={'/icon-2'} icon={randomIcon()}>
                {'Disabled'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'Another'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'More Icon'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'Alert levels'}>
            <es-layout-link
                alertLevel={'error'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Error'}
            </es-layout-link>
            <es-layout-link
                alertLevel={'warning'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Warning'}
            </es-layout-link>
            <es-layout-link
                alertLevel={'okay'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Okay'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} count={12}>
                {'Counter'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'Level Example'}>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```
