<!-- show-location -->

```tsx
import { Switch, Link, Route, PageTitle } from '@eventstore-ui/router';

export default () => (
    <>
        <Switch>
            <Route
                url={'/somewhere'}
                routeRender={() => (
                    <>
                        <PageTitle>{'Somewhere'}</PageTitle>
                        <div>{'Somewhere'}</div>
                    </>
                )}
            />
            <Route
                url={'/elsewhere'}
                routeRender={() => (
                    <>
                        <PageTitle>{'Elsewhere'}</PageTitle>
                        <div>{'Elsewhere'}</div>
                    </>
                )}
            />
            <Route
                routeRender={() => (
                    <>
                        <PageTitle>{'Anywhere'}</PageTitle>
                        <div>{'Anywhere'}</div>
                    </>
                )}
            />
        </Switch>
        <ul>
            <li>
                <Link url={'/somewhere'}>{'go somewhere'}</Link>
            </li>
            <li>
                <Link url={'/elsewhere'}>{'go elsewhere'}</Link>
            </li>
            <li>
                <Link url={'/anywhere'}>{'go anywhere'}</Link>
            </li>
        </ul>
    </>
);
```
