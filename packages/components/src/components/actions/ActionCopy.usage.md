```tsx
import { ActionCopy } from '@kurrent-ui/components';

export default () => (
    <c2-actions>
        <ActionCopy
            value={'hello copy'}
            toast={{
                title: 'Copied!',
                message: 'Successfully copied "hello copy" to clipboard',
            }}
        >
            {'Copy name'}
        </ActionCopy>
    </c2-actions>
);
```
