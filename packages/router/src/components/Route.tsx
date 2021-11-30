import type { VNode, FunctionalComponent } from '@stencil/core';
import type { RouteRenderProps, MatchResults } from '../types';

import { INTERNAL_ROUTER } from '../utils/globals';
import { cullDecendants } from '../utils/createCullableNode';

/** @props */
export interface RouteProps {
    /** The url or urls to match against. You can use express style paths, with the resulting matches being passed to `routeRender`. */
    url?: string | string[];
    /** If the url should match exactly, or allow decendant matching. */
    exact?: boolean;
    /** Callback to render the route. */
    routeRender?: (props: RouteRenderProps) => VNode | VNode[];
}

export const ROUTE_DELIMITER = '\n'.repeat(3);

/**
 * Conditionaly render if passed URL matches current location.
 * It is possible to pass the components to render as children, or via `routeRender`, but it is preferable to use `routeRender` for faster computation.
 * @usage ./Route.usage.md
 */

export const Route: FunctionalComponent<RouteProps> = (
    { url, exact, routeRender },
    children,
    utils,
) => {
    const match = window[INTERNAL_ROUTER].match({
        exact: exact,
        path: url,
        strict: true,
    });

    if (!match) {
        cullDecendants(children, utils);
        return null as any;
    }

    if (routeRender) {
        return [
            routeRender({
                history: window[INTERNAL_ROUTER].history,
                match: match as MatchResults,
            }),
            ROUTE_DELIMITER,
        ];
    }

    return [
        utils.map(children, (child) => ({
            ...child,
            vattrs: {
                ...child.vattrs,
                match,
                history: window[INTERNAL_ROUTER].history,
            },
        })),
        ROUTE_DELIMITER,
    ];
};
