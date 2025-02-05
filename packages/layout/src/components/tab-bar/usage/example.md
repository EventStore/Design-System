```tsx
import type { RouteTab } from '@kurrent-ui/layout';
import { Link, Route, Switch } from '@kurrent-ui/router';

const tabs: RouteTab[] = [
    {
        id: 'tab-1',
        title: 'One',
    },
    {
        id: 'tab-2',
        title: 'Two',
        badge: () => true,
    },
    {
        id: 'tab-3',
        title: 'Three',
        url: '/tab-three',
    },
    {
        id: 'tab-4',
        title: 'Four',
    },
];

export default () => (
    <>
        <l2-tab-bar tabs={tabs} />
        <Switch>
            <Route
                url={'/tab-1'}
                routeRender={() => <p>{'I am in tab 1'}</p>}
            />
            <Route
                url={'/tab-2'}
                routeRender={() => <p>{'Welcome to tab 2!'}</p>}
            />
            <Route
                url={'/tab-three'}
                routeRender={() => <p>{'Hello 👋. You have reached tab 3.'}</p>}
            />
            <Route
                url={'/tab-4'}
                routeRender={() => (
                    <div>
                        <p>{'Tab 4 now'}</p>
                        <br />
                        <Link url={'/tab-1'}>{'go to one'}</Link>
                        <br />
                        <Link url={'/tab-20'}>{'go nowhere'}</Link>
                    </div>
                )}
            />
        </Switch>
    </>
);
```
