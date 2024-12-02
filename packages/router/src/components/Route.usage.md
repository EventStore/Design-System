<!-- show-location -->

```tsx
import { Link, Route, PageTitle } from '@kurrent-ui/router';

export default () => (
    <>
        {/* An exact route will only match on an exact match */}
        <Route
            exact
            url={'/someplace'}
            routeRender={() => (
                <>
                    <PageTitle>{'Some place'}</PageTitle>
                    <div>{'Some place'}</div>
                </>
            )}
        />

        {/* An exact route will only match on an exact match */}
        <Route
            url={'/someplace'}
            routeRender={() => <div>{'We are Some place in Some place'}</div>}
        />

        {/* You can use express style urls to add to the match params */}
        <Route
            url={'/someplace/:place'}
            routeRender={({ match }) => (
                <>
                    <PageTitle>{`Some place ${match.params.place}`}</PageTitle>
                    <div>{`We are some place ${match.params.place}`}</div>
                </>
            )}
        />

        {/* Not passing a url will always match */}
        <Route routeRender={() => <div>{'We could be Anywhere'}</div>} />

        <ul>
            <li>
                <Link url={'/someplace'}>{'go someplace'}</Link>
            </li>
            <li>
                <Link url={'/someplace/else'}>{'go someplace else'}</Link>
            </li>
            <li>
                <Link url={'/someplace/far-away'}>
                    {'go someplace far away'}
                </Link>
            </li>
            <li>
                <Link url={'/anywhere'}>{'go anywhere'}</Link>
            </li>
        </ul>
    </>
);
```
