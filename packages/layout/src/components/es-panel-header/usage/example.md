```tsx
import { randomIcon } from 'helpers';

export default () => (
    <es-panel>
        <es-panel-header>
            {'hello there'}
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
        </es-panel-header>
        <p>{'I am a panel'}</p>
    </es-panel>
);
```
