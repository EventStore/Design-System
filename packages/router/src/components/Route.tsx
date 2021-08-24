import { VNode, FunctionalComponent } from '@stencil/core';
import { RouteRenderProps, MatchResults } from '../types';
import router from '../utils/internalRouter';
import { cullDecendants } from '../utils/createCullableNode';

export type RouteRender = (props: RouteRenderProps) => VNode | VNode[];

export interface RouteProps {
    /** The url or urls to match against. */
    url?: string | string[];
    /** If the url should match exactly, or allow decendant matching. */
    exact?: boolean;
    /** Callback to render the route. */
    routeRender?: RouteRender;
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
    const match = router.match({
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
                history: router.history,
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
                history: router.history,
            },
        })),
        ROUTE_DELIMITER,
    ];
};
