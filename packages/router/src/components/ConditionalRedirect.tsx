import { h, FunctionalComponent } from '@stencil/core';
import { router } from '../utils/publicRouter';
import { Redirect } from './Redirect';

import { Route } from './Route';

export interface ConditionalRedirectProps {
    from: string | string[];
    to: string;
    exact?: boolean;
}

export const ConditionalRedirect: FunctionalComponent<ConditionalRedirectProps> = ({
    from,
    to,
    exact,
}) => {
    if (!to) return null as any;

    return (
        <Route
            url={from}
            exact={exact}
            routeRender={({ match: { params } }) => (
                <Redirect url={router.fillPath(to, params)} />
            )}
        />
    );
};
