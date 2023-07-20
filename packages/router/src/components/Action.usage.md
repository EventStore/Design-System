<!-- show-location -->

```tsx
import { Action, Link, Route, Switch } from '@eventstore-ui/router';
import { toast } from '@eventstore-ui/components';

export default () => (
    <>
        <Switch>
            <Route url={'/somewhere'}>
                <Action
                    action={() => {
                        toast.info({
                            title: 'The somewhere action',
                            message: 'It ran',
                        });
                    }}
                />
            </Route>
            <Route>
                <Action
                    action={() => {
                        toast.info({
                            title: 'The catch-all action',
                            message: 'It ran',
                        });
                    }}
                />
            </Route>
        </Switch>
        <ul>
            <li>
                <Link url={'/somewhere'}>{'go somewhere'}</Link>
            </li>
            <li>
                <Link url={'/anywhere'}>{'go anywhere'}</Link>
            </li>
        </ul>
    </>
);
```
