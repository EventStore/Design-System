```tsx
import { Link } from '@eventstore/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section sectionTitle={'Buttons'}>
            <es-layout-button onClick={console.log}>
                {'Example button'}
            </es-layout-button>
            <es-layout-button active onClick={console.log}>
                {'I am active'}
            </es-layout-button>
            <es-layout-button onClick={console.log}>
                {'Example button'}
            </es-layout-button>
            <es-layout-button disabled onClick={console.log}>
                {'Disabled example  '}
            </es-layout-button>
        </es-layout-section>
        <es-layout-section sectionTitle={'With Icon'}>
            <es-layout-button onClick={console.log} icon={randomIcon()}>
                {'With Icon'}
            </es-layout-button>
            <es-layout-button
                disabled
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Disabled'}
            </es-layout-button>
            <es-layout-button onClick={console.log} icon={randomIcon()}>
                {'Another'}
            </es-layout-button>
            <es-layout-button onClick={console.log} icon={randomIcon()}>
                {'More Icon'}
            </es-layout-button>
        </es-layout-section>
        <es-layout-section sectionTitle={'Alert levels'}>
            <es-layout-button
                alertLevel={'error'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Error'}
            </es-layout-button>
            <es-layout-button
                alertLevel={'warning'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Warning'}
            </es-layout-button>
            <es-layout-button
                alertLevel={'okay'}
                onClick={console.log}
                icon={randomIcon()}
            >
                {'Okay'}
            </es-layout-button>
            <es-layout-button onClick={console.log} count={12}>
                {'Counter'}
            </es-layout-button>
        </es-layout-section>
        <es-layout-section sectionTitle={'Level Example'}>
            <es-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={2}>
                {'Level 2'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={3}>
                {'Level 3'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={3}>
                {'Level 3'}
            </es-layout-button>
            <es-layout-button onClick={console.log} level={1}>
                {'Level 1'}
            </es-layout-button>
        </es-layout-section>
    </es-sidebar>
);
```
