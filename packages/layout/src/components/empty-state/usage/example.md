```tsx
export default () => (
    <l2-empty-state header={'Create a new group'}>
        <kurrent-sequence slot={'illustration'} />
        {
            'Creating a new group will allow for the grouping of members with the same access.'
        }
        <c2-button slot={'foot'} variant={'outline'}>
            {'New group'}
            <c2-icon icon={'plus'} slot={'after'} />
        </c2-button>
    </l2-empty-state>
);
```
