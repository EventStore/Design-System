import { forceUpdate, getElement, getRenderingRef } from '@stencil/core';

import type {
    LocationSegments,
    MatchOptions,
    MatchResults,
    RouterHistory,
    RouterOptions,
} from '../types';

import { createBrowserHistory } from './createBrowserHistory';
import { logger } from './logger';
import { matchPath } from './match-path';
import { compile } from './path-to-regex';

export class InternalRouter {
    public root: string = '/';
    public titleSuffix!: string;
    public location!: LocationSegments;
    public history!: RouterHistory;

    constructor({
        root = '/',
        titleSuffix = '',
        document: passedDoc,
    }: RouterOptions = {}) {
        const doc =
            passedDoc ||
            (getRenderingRef() &&
                getElement(getRenderingRef())?.ownerDocument) ||
            document;

        this.root = root;
        this.titleSuffix = titleSuffix;

        this.history = createBrowserHistory(doc.defaultView!);

        this.history.listen(this.updateLocation);
        this.history.listen(this.informInterestedParties);
        this.history.listen(this.updateScroll);
        this.updateLocation(this.history.location);
    }

    private updateLocation = (location: LocationSegments) => {
        // Remove the root URL if found at beginning of string
        const pathname =
            location.pathname.indexOf(this.root) === 0
                ? '/' + location.pathname.slice(this.root.length)
                : location.pathname;

        location = {
            ...location,
            pathname,
        };

        this.location = location;
        this.matchCache.clear();
    };

    private updateScroll = ({ scrollPosition }: LocationSegments) => {
        if (!scrollPosition) return;
        window.scrollTo(...scrollPosition);
    };

    private interestFinders = new Map<
        typeof getRenderingRef,
        typeof forceUpdate
    >([[getRenderingRef, forceUpdate]]);
    public with = (
        getInterested: typeof getRenderingRef,
        updateInterested: typeof forceUpdate,
    ): this => {
        if (!this.interestFinders.has(getInterested)) {
            this.interestFinders.set(getInterested, updateInterested);
        }

        return this;
    };

    private interestedParties = new Set<() => void>();
    public updateInterestedParties = () => {
        for (const [getInterested, updateInterested] of this.interestFinders) {
            const ref = getInterested();
            if (ref) {
                this.interestedParties.add(() => updateInterested(ref));
            }
        }
    };

    private informInterestedParties = () => {
        const interestedParties = Array.from(this.interestedParties);
        this.interestedParties.clear();

        for (const update of interestedParties) {
            update();
        }
    };

    private matchCache = new Map<string, MatchResults | null>();
    get match() {
        this.updateInterestedParties();
        return (options: MatchOptions): MatchResults | null => {
            if (
                typeof options.path === 'string' &&
                options.path.startsWith('#')
            ) {
                return options.path === this.location.hash
                    ? {
                          path: options.path,
                          url: this.location.pathname,
                          isExact: !!options.exact,
                          params: {},
                      }
                    : null;
            }

            const key = JSON.stringify(options);

            if (this.matchCache.has(key)) {
                return this.matchCache.get(key)!;
            }

            const match = matchPath(this.location.pathname, options);

            this.matchCache.set(key, match);

            return match;
        };
    }

    public getUrl = (url: string) => {
        if (url.charAt(0) === '#') {
            return url;
        }

        const root = this.root;

        // Don't allow double slashes
        if (url.charAt(0) === '/' && root.charAt(root.length - 1) === '/') {
            return root.slice(0, root.length - 1) + url;
        }

        return root + url;
    };

    public setDocumentTitle = (
        title: string,
        noSuffix: boolean,
        document: Document = this.history.win.document,
    ) => {
        document.title = `${title}${noSuffix ? '' : this.titleSuffix}`;
    };

    public redirect = (url: string) => {
        this.history.replace(this.getUrl(url));
    };

    private pendingActions = new Map<any, Set<() => void>>();

    public get action() {
        this.updateInterestedParties();

        return (callback: () => void) => {
            const ref = getRenderingRef();

            if (!ref) {
                callback();
                return () => {
                    logger.warn(
                        'Attempted to cancel an action that was already called',
                    );
                };
            }

            if (this.pendingActions.has(ref)) {
                this.pendingActions.get(ref)!.add(callback);
            } else {
                this.pendingActions.set(ref, new Set([callback]));
                this.queueActionOnRef(ref);
            }

            return () => {
                this.pendingActions.get(ref)!.delete(callback);
            };
        };
    }

    public fillPath = (
        path: string,
        parameters?: Record<string, string>,
    ): string => {
        const params =
            parameters ??
            this.match({
                path,
                exact: false,
                strict: true,
            })?.params ??
            {};

        return compile(path)(params);
    };

    private queueActionOnRef = async (ref: any) => {
        const element = getElement(ref);
        await element?.componentOnReady?.();

        if (element?.ownerDocument?.contains(element)) {
            this.pendingActions.get(ref)?.forEach((cb) => cb());
        }
        this.pendingActions.delete(ref);
    };
}
