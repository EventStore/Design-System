import { h, FunctionalComponent } from '@stencil/core';
import { router } from '../utils/publicRouter';
import { Redirect } from './Redirect';

import { Route } from './Route';

export interface ConditionalRedirectProps {
    /** The route or routes to redirect from. */
    from: string | string[];
    /** The route to redirect to. */
    to: string;
    /** If the route matching should be exact, or include child routes. */
    exact?: boolean;
}

/**
 * Redirect only if route matches.
 * @usage ./ConditionalRedirect.usage.md
 */
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
