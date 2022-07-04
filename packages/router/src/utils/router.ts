import { forceUpdate, getRenderingRef } from '@stencil/core';
import type {
    RouterHistory,
    LocationSegments,
    Router,
    RouterOptions,
} from '../types';
import { INTERNAL_ROUTER } from './globals';
import { InternalRouter } from './internalRouter';
import { logger } from './logger';

export class PublicRouter implements Router {
    private get internal() {
        if (!window[INTERNAL_ROUTER]) {
            this.init();
        }

        return window[INTERNAL_ROUTER].with(getRenderingRef, forceUpdate);
    }

    public init = (options?: RouterOptions) => {
        if (window[INTERNAL_ROUTER] != null) {
            logger.warn('Router has already been initialized');
            return;
        }

        window[INTERNAL_ROUTER] = new InternalRouter(options);
    };

    public get history(): RouterHistory {
        this.internal.updateInterestedParties();
        return this.internal.history;
    }

    public get location(): LocationSegments {
        this.internal.updateInterestedParties();
        return this.internal.location;
    }

    public get match() {
        return this.internal.match;
    }

    public fillPath = (
        path: string,
        parameters?: Record<string, string>,
    ): string => {
        this.internal.updateInterestedParties();
        return this.internal.fillPath(path, parameters);
    };

    public getUrl = (url: string): string => {
        this.internal.updateInterestedParties();
        return this.internal.getUrl(url);
    };
}

export const router = new PublicRouter();
