import { h, FunctionalComponent } from '@stencil/core';
import { INTERNAL_ROUTER } from '../utils/globals';
import { Redirect } from './Redirect';
import { Route } from './Route';

/** @props */
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
                <Redirect url={window[INTERNAL_ROUTER].fillPath(to, params)} />
            )}
        />
    );
};
