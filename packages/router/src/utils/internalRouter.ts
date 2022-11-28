import {
    forceUpdate as forceUpdateRaw,
    getElement as getElementRaw,
    getRenderingRef as getRenderingRefRaw,
} from '@stencil/core';

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

type ForceUpdate = typeof forceUpdateRaw;
type GetElement = typeof getElementRaw;
type GetRenderingRef = typeof getRenderingRefRaw;

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
            (getRenderingRefRaw() &&
                getElementRaw(getRenderingRefRaw())?.ownerDocument) ||
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

    private refUtils = new Map<
        GetRenderingRef,
        { forceUpdate: ForceUpdate; getElement: GetElement }
    >([
        [
            getRenderingRefRaw,
            { forceUpdate: forceUpdateRaw, getElement: getElementRaw },
        ],
    ]);

    public with = (
        getRenderingRef: GetRenderingRef,
        forceUpdate: ForceUpdate,
        getElement: GetElement,
    ): this => {
        if (!this.refUtils.has(getRenderingRef)) {
            this.refUtils.set(getRenderingRef, {
                forceUpdate,
                getElement,
            });
        }

        return this;
    };

    private interestedParties = new Set<() => void>();
    public updateInterestedParties = () => {
        for (const [getRenderingRef, { forceUpdate }] of this.refUtils) {
            const ref = getRenderingRef();
            if (ref) {
                this.interestedParties.add(() => forceUpdate(ref));
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

    public getUrl(url: LocationSegments): LocationSegments;
    public getUrl(url: string): string;
    public getUrl(url: string | LocationSegments): typeof url;
    public getUrl(url: string | LocationSegments): typeof url {
        if (typeof url === 'string') {
            if (url.charAt(0) === '#') {
                return url;
            }

            const root = this.root;

            // Don't allow double slashes
            if (url.charAt(0) === '/' && root.charAt(root.length - 1) === '/') {
                return root.slice(0, root.length - 1) + url;
            }

            return root + url;
        }

        const { pathname, ...rest } = url;

        return {
            pathname: this.getUrl(pathname),
            ...rest,
        };
    }

    public setDocumentTitle = (
        title: string,
        noSuffix: boolean,
        document: Document = this.history.win.document,
    ) => {
        document.title = `${title}${noSuffix ? '' : this.titleSuffix}`;
    };

    public push: RouterHistory['push'] = (path, ...args) =>
        this.history.push(this.getUrl(path), ...args);
    public replace: RouterHistory['replace'] = (path, ...args) =>
        this.history.replace(this.getUrl(path), ...args);
    public goBack: RouterHistory['goBack'] = (...args) =>
        this.history.goBack(...args);
    public goForward: RouterHistory['goForward'] = (...args) =>
        this.history.goForward(...args);

    /** Load a specific page from the session history. You can use it to move forwards and backwards through the history depending on the value of a parameter. */
    public go: RouterHistory['go'] = (...args) => this.history.go(...args);

    private pendingActions = new Map<ReturnType<GetElement>, Set<() => void>>();

    private getActionElement = () => {
        for (const [getRenderingRef, { getElement }] of this.refUtils) {
            const ref = getRenderingRef();
            if (ref) {
                return getElement(ref);
            }
        }
    };

    public get action() {
        this.updateInterestedParties();

        return (callback: () => void) => {
            const el = this.getActionElement();

            if (!el) {
                callback();
                return () => {
                    logger.warn(
                        'Attempted to cancel an action that was already called',
                    );
                };
            }

            if (this.pendingActions.has(el)) {
                this.pendingActions.get(el)!.add(callback);
            } else {
                this.pendingActions.set(el, new Set([callback]));
                this.queueActionOnElement(el);
            }

            return () => {
                this.pendingActions.get(el)!.delete(callback);
            };
        };
    }

    private queueActionOnElement = async (element: ReturnType<GetElement>) => {
        await element?.componentOnReady?.();

        if (element?.ownerDocument?.contains(element)) {
            this.pendingActions.get(element)?.forEach((cb) => cb());
        }

        this.pendingActions.delete(element);
    };

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
}
