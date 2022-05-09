```tsx
import { PageChangeEventType } from '@eventstore/components
private handlePageChange = (e: CustomEvent<PageChangeEventType>) => {
    switch (e.detail) {
        case 'first':
            this.current = 1;
            break;
        case 'previous':
            this.current = this.current - 1;
            break;
        case 'next':
            this.current = this.current + 1;
            break;
        case 'last':
            this.current = this.pages;
            break;
    }
};


export default () => (
    <>
        <es-pagination
            pages={this.pages}
            onUpdate={this.handlePageChange}
            current={this.current}
            finite={true}
        />
    </>
);
```
