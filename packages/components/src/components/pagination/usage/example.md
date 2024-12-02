```tsx
import type { PageChangeEventType } from '@kurrent-ui/components';
import { createStore } from '@kurrent-ui/stores';

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
    <c2-pagination
        pageCount={state.pageCount}
        onUpdate={handlePageChange}
        current={state.current}
    />
);
```
