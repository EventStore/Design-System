```tsx
import { toast } from '@kurrent-ui/components';

export default () => (
    <c2-actions>
        <c2-action
            icon={'id-card'}
            action={() =>
                toast.info({
                    title: 'Clicked!',
                    message: 'Thank you for clicking.',
                })
            }
        >
            {'Generic action'}
        </c2-action>
    </c2-actions>
);
```
