<!-- show-location -->

```tsx
import { Switch, Link, Route, PageTitle, Redirect } from '@eventstore-ui/router';

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
                url={'/404'}
                routeRender={() => (
                    <>
                        <PageTitle>{'404 - not found'}</PageTitle>
                        <div>{'404'}</div>
                    </>
                )}
            />
            {/* If nothing matches, we'll go to 404 */}
            <Route>
                <Redirect url={'/404'} />
            </Route>
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
