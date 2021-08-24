<!-- show-location -->

```tsx
import { Link } from '@eventstore/router';

export default () => (
    <ul>
        <li>
            <Link url={'/somewhere'}>{'Go somewhere'}</Link>
        </li>
        <li>
            <Link url={'/elsewhere'}>{'Go elsewhere'}</Link>
        </li>
        <li>
            <Link url={'/nowhere'} activeClass={'nowhere'}>
                {'Go nowhere'}
            </Link>
        </li>
    </ul>
);
```

```css
.active-link {
    background-color: pink;
}

.nowhere {
    background: linear-gradient(to right, #ec2f4b, #009fff);
}
```
