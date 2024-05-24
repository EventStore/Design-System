```tsx
import { ActionCopy } from '@eventstore-ui/components';

export default () => (
    <es-actions>
        <ActionCopy
            value={'hello copy'}
            toast={{
                title: 'Copied!',
                message: 'Successfully copied "hello copy" to clipboard',
            }}
        >
            {'Copy name'}
        </ActionCopy>
    </es-actions>
);
```
