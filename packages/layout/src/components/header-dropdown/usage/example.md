```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-header>
        <l2-header-dropdown
            slot={'right'}
            icon={randomIcon()}
            buttonText={'JJJ'}
        >
            <header class={'user_dropdown_header'}>
                <c2-icon icon={randomIcon()} />
                <h1>{'John John Johnson'}</h1>
                <h2>{'jjj@johnson.com'}</h2>
            </header>
            <l2-layout-link
                matchExact
                url={'/'}
                count={22}
                alertLevel={'error'}
            >
                {'Hello!'}
            </l2-layout-link>
            <l2-layout-link url={'/somewhere'} icon={randomIcon()}>
                {'Go somewhere'}
            </l2-layout-link>
        </l2-header-dropdown>
        <l2-theme-dropdown slot={'right'} />
        <l2-nav
            navTree={[
                {
                    title: 'Link 1',
                    url: '/a',
                },
                {
                    title: 'Link 2',
                    url: '/b',
                },
                {
                    title: 'Link 3',
                    url: '/c',
                },
            ]}
            slot={'under'}
        />
    </l2-header>
);
```

```css
.user_dropdown_header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: var(--color-shade-20);
    color: var(--color-foreground);
}

.user_dropdown_header c2-icon {
    color: var(--color-highlight);
}

.user_dropdown_header h1 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 17px;
    margin-bottom: 5px;
}

.user_dropdown_header h2 {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
}
```
