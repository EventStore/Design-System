```tsx

export default () =>
<div>
    <es-empty-state header={'Example empty state'} body={<es-button>{'There are no items'}</es-button>}>
    <p slot='illustration'>{'Illustration here'}</p>
    <p slot='foot'>{ 'Footer goes here' }</p>
    </es-empty-state>
    <hr/>
    <es-empty-state header={'Example empty state'} body={'No items to show'} layout='horizontal'>
    <p slot='illustration'>{ 'Illustration here' }</p>
    <p slot='foot'>{ 'Footer goes here' }</p>
    </es-empty-state>
</div>
        
```