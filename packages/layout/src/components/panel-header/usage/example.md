```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-panel>
        <l2-panel-header>
            {'hello there'}
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
        </l2-panel-header>
        <p>{'I am a panel'}</p>
    </l2-panel>
);
```
