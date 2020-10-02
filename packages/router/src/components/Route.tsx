import { VNode, FunctionalComponent } from '@stencil/core';
import { RouteRenderProps, MatchResults } from '../types';
import router from '../utils/internalRouter';
import { cullDecendants } from '../utils/createCullableNode';

export type RouteRender = (props: RouteRenderProps) => VNode | VNode[];

export interface RouteProps {
    url?: string | string[];
    exact?: boolean;
    routeRender?: RouteRender;
}

export const ROUTE_DELIMITER = '\n'.repeat(3);

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
