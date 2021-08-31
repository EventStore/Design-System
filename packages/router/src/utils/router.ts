import {
    RouterHistory,
    LocationSegments,
    RouterOptions,
    Router,
} from '../types';
import internalRouter from './internalRouter';
import { compile } from './path-to-regex';

class PublicRouter implements Router {
    public init = (options?: RouterOptions) => {
        internalRouter.init(options);
    };

    public get history(): RouterHistory | null {
        internalRouter.updateInterestedParties();
        return internalRouter.history;
    }

    public get location(): LocationSegments | null {
        internalRouter.updateInterestedParties();
        return internalRouter.location;
    }

    public fillPath = (
        path: string,
        parameters?: Record<string, string>,
    ): string => {
        internalRouter.updateInterestedParties();

        const params =
            parameters ??
            internalRouter.match({
                path,
                exact: false,
                strict: true,
            })?.params ??
            {};

        return compile(path)(params);
    };
}

/** Global router instance. */
export const router: Router = new PublicRouter();
