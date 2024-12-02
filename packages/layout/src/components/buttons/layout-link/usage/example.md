```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-sidebar>
        <l2-layout-section sectionTitle={'Links'}>
            <l2-layout-link url={'/no-icon-1'}>{'Example link'}</l2-layout-link>
            <l2-layout-link url={'/preview'}>{'I am active'}</l2-layout-link>
            <l2-layout-link url={'/no-icon-1'}>{'Example link'}</l2-layout-link>
            <l2-layout-link disabled url={'/no-icon-2'}>
                {'Disabled example  '}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'With Icon'}>
            <l2-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'With Icon'}
            </l2-layout-link>
            <l2-layout-link disabled url={'/icon-2'} icon={randomIcon()}>
                {'Disabled'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'Another'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'More Icon'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'Alert levels'}>
            <l2-layout-link
                alertLevel={'error'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Error'}
            </l2-layout-link>
            <l2-layout-link
                alertLevel={'warning'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Warning'}
            </l2-layout-link>
            <l2-layout-link
                alertLevel={'okay'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Okay'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} count={12}>
                {'Counter'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'Level Example'}>
            <l2-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </l2-layout-link>
            <l2-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </l2-layout-link>
        </l2-layout-section>
    </l2-sidebar>
);
```
