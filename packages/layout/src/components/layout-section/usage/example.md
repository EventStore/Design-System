```tsx
export default () => (
    <l2-sidebar>
        <l2-layout-section>
            <l2-layout-link url={'/'}>
                {'My section has no title'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'I am a section'}>
            <l2-layout-link url={'/somewhere-else'}>
                {'My section has a title'}
            </l2-layout-link>
        </l2-layout-section>
    </l2-sidebar>
);
```
