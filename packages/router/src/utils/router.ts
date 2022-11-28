import { forceUpdate, getElement, getRenderingRef } from '@stencil/core';
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

        return window[INTERNAL_ROUTER].with(
            getRenderingRef,
            forceUpdate,
            getElement,
        );
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

    public getUrl(url: LocationSegments): LocationSegments;
    public getUrl(url: string): string;
    public getUrl(url: string | LocationSegments): typeof url;
    public getUrl(url: string | LocationSegments): typeof url {
        this.internal.updateInterestedParties();
        return this.internal.getUrl(url);
    }

    /** Push a location (navigate) to a path or location. `path` has baseUrl added. */
    public get push() {
        return this.internal.push;
    }

    /** Replace the current location with a path or location. `path` has baseUrl added. */
    public get replace() {
        return this.internal.replace;
    }

    /** Move back one page in the session history. It has the same effect as calling go(-1). If there is no previous page, this method call does nothing. */
    public get goBack() {
        return this.internal.goBack;
    }

    /** Move forward one page in the session history. It has the same effect as calling go(1). If there is no next page, this method call does nothing. */
    public get goForward() {
        return this.internal.goForward;
    }

    /** Load a specific page from the session history. You can use it to move forwards and backwards through the history depending on the value of a parameter. */
    public get go() {
        return this.internal.go;
    }
}

export const router = new PublicRouter();
