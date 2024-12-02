```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-sidebar>
        <l2-layout-section sectionTitle={'Buttons'}>
            <l2-layout-button onClick={console.log}>
                {'Example button'}
            </l2-layout-button>
            <l2-layout-button active onClick={console.log}>
                {'I am active'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log}>
                {'Example button'}
            </l2-layout-button>
            <l2-layout-button disabled onClick={console.log}>
                {'Disabled example  '}
            </l2-layout-button>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'With Icon'}>
            <l2-layout-button onClick={console.log} icon={randomIcon()}>
                {'With Icon'}
            </l2-layout-button>
            <l2-layout-button
                disabled
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Disabled'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} icon={randomIcon()}>
                {'Another'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} icon={randomIcon()}>
                {'More Icon'}
            </l2-layout-button>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'Alert levels'}>
            <l2-layout-button
                alertLevel={'error'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Error'}
            </l2-layout-button>
            <l2-layout-button
                alertLevel={'warning'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Warning'}
            </l2-layout-button>
            <l2-layout-button
                alertLevel={'okay'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Okay'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} count={12}>
                {'Counter'}
            </l2-layout-button>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'Level Example'}>
            <l2-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={3}>
                {'Level 3'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={3}>
                {'Level 3'}
            </l2-layout-button>
            <l2-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </l2-layout-button>
        </l2-layout-section>
    </l2-sidebar>
);
```
