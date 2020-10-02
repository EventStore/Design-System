import { RouterHistory, LocationSegments } from '../types';
import internalRouter, { RouterOptions } from './internalRouter';
import { compile } from './path-to-regex';

class PublicRouter {
    public init = (options: RouterOptions) => {
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

export const router = new PublicRouter();
