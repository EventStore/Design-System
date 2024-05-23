```tsx
export default () => (
    <es-actions>
        <es-action-copy
            value={'hello copy'}
            toast={{
                title: 'Copied!',
                message: 'Successfully copied "hello copy" to clipboard',
            }}
        >
            {'Copy name'}
        </es-action-copy>
    </es-actions>
);
```
