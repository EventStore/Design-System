```tsx
import { toast } from '@eventstore-ui/components';

export default () => (
    <es-actions>
        <es-action
            icon={'id-card'}
            action={() =>
                toast.info({
                    title: 'Clicked!',
                    message: 'Thank you for clicking.',
                })
            }
        >
            {'Generic action'}
        </es-action>
    </es-actions>
);
```
