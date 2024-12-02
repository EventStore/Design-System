```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-toolbar>
        <menu>
            <li>
                <c2-button>
                    <c2-icon icon={randomIcon()} />
                </c2-button>
            </li>
            <li>
                <c2-button>
                    <c2-icon icon={randomIcon()} />
                </c2-button>
            </li>
        </menu>
    </l2-toolbar>
);
```

```css
menu {
    all: unset;
    display: block;
    padding: 10px;
    padding-top: 32px;
}

li {
    all: unset;
    display: block;
    margin-bottom: 10px;
}
```
