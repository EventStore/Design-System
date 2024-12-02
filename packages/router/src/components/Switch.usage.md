<!-- show-location -->

```tsx
import { Switch, Link, Route, PageTitle, Redirect } from '@kurrent-ui/router';

export default () => (
    <>
        <Switch>
            {/* If we match a child, we go there, ignoring all subsequent matches */}
            <Route
                url={'/somewhere/:place'}
                routeRender={({ match }) => (
                    <>
                        <PageTitle>{`Somewhere ${match.params.place}`}</PageTitle>
                        <div>{`We are somewhere ${match.params.place}`}</div>
                    </>
                )}
            />
            {/* So although this is not an exact match, the former will match first. */}
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
            {/* A blank route always matches, so if nothing matches prior, we'll go to 404 */}
            <Route>
                <Redirect url={'/404'} />
            </Route>
        </Switch>
        <ul>
            <li>
                <Link url={'/somewhere'}>{'go somewhere'}</Link>
            </li>
            <li>
                <Link url={'/somewhere/further'}>{'go somewhere further'}</Link>
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
