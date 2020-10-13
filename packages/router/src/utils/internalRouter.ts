import { forceUpdate, getElement, getRenderingRef } from '@stencil/core';

import {
    HistoryType,
    LocationSegments,
    MatchOptions,
    MatchResults,
    RouterHistory,
} from '../types';

import createBrowserHistory from './createBrowserHistory';
import createHashHistory from './createHashHistory';
import { warning } from './log';
import { matchPath } from './match-path';

export interface RouterOptions {
    root?: string;
    historyType?: HistoryType;
    titleSuffix?: string;
    document?: Document;
}

class InternalRouter {
    public initialized = false;
    public root: string = '/';
    public titleSuffix!: string;
    public location!: LocationSegments;
    public history!: RouterHistory;

    public init = ({
        historyType = 'browser',
        root = '/',
        titleSuffix = '',
        document: passedDoc,
    }: RouterOptions = {}) => {
        if (this.initialized) {
            warning(false, 'Router has already been initialized');
            return;
        }
        const doc =
            passedDoc ||
            (getRenderingRef() &&
                getElement(getRenderingRef())?.ownerDocument) ||
            document;

        this.root = root;
        this.titleSuffix = titleSuffix;

        switch (historyType) {
            case 'browser':
                this.history = createBrowserHistory(doc.defaultView!);
                break;
            case 'hash':
                this.history = createHashHistory(doc.defaultView!);
                break;
        }

        this.history.listen(this.updateLocation);
        this.history.listen(this.informInterestedParties);
        this.updateLocation(this.history.location);
        this.initialized = true;
    };

    private updateLocation = (location: LocationSegments) => {
        // Remove the root URL if found at beginning of string
        const pathname =
            location.pathname.indexOf(this.root) == 0
                ? '/' + location.pathname.slice(this.root.length)
                : location.pathname;

        location = {
            ...location,
            pathname,
        };

        this.location = location;
        this.matchCache.clear();
    };

    private interestedParties = new Set<any>();
    public updateInterestedParties = () => {
        const ref = getRenderingRef();
        if (!ref) return;
        this.interestedParties.add(ref);
    };

    private informInterestedParties = () => {
        const interestedParties = Array.from(this.interestedParties);
        this.interestedParties.clear();

        for (const ref of interestedParties) {
            forceUpdate(ref);
        }
    };

    private matchCache = new Map<string, MatchResults | null>();
    get match() {
        if (!this.initialized) this.init();
        this.updateInterestedParties();
        return (options: MatchOptions) => {
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
        if (url.charAt(0) == '/' && root.charAt(root.length - 1) == '/') {
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

    private pendingActions = new Map<any, Set<Function>>();

    public get action() {
        this.updateInterestedParties();

        return (callback: () => void) => {
            const ref = getRenderingRef();

            if (!ref) {
                callback();
                return () => {
                    warning(
                        true,
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

    private queueActionOnRef = async (ref: any) => {
        const element = await getElement(ref).componentOnReady();
        if (element?.ownerDocument?.contains(element)) {
            this.pendingActions.get(ref)?.forEach((cb) => cb());
        }
        this.pendingActions.delete(ref);
    };
}

export default new InternalRouter();
