import { RouterHistory, LocationSegments } from '../types';
import internalRouter, { RouterOptions } from './internalRouter';

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
}

export default new PublicRouter();
