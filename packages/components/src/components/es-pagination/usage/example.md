```tsx
import { PageChangeEventType } from '@eventstore/components';
import { createStore } from '@eventstore/stores';

interface PageStore {
    current: number;
    pageCount: number;
}

const { state } = createStore<PageStore>({
    current: 1,
    pageCount: 20,
});

const handlePageChange = (e: CustomEvent<PageChangeEventType>) => {
    switch (e.detail) {
        case 'first':
            state.current = 1;
            break;
        case 'previous':
            state.current = state.current - 1;
            break;
        case 'next':
            state.current = state.current + 1;
            break;
        case 'last':
            state.current = state.pageCount;
            break;
    }
};

export default () => (
    <es-pagination
        pageCount={state.pageCount}
        onUpdate={handlePageChange}
        current={state.current}
    />
);
```
