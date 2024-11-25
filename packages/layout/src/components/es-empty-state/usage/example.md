```tsx
export default () => (
    <es-empty-state header={'Create a new group'}>
        <kurrent-sequence slot={'illustration'} />
        {
            'Creating a new group will allow for the grouping of members with the same access.'
        }
        <es-button slot={'foot'} variant={'outline'}>
            {'New group'}
            <es-icon icon={'plus'} slot={'after'} />
        </es-button>
    </es-empty-state>
);
```
