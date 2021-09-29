export type Path = string | RegExp | Array<string | RegExp>;

export type Prompt = (location: LocationSegments, action: string) => string;

/** Automatically passed to children of Routes and from `routeRender` prop. */
export interface RouteRenderProps {
    /** The router history. (same as `router.history`). */
    history: RouterHistory;
    /** The match params of the parent Route's path. */
    match: MatchResults;
}

export interface LocationSegments {
    /** The path from root. */
    pathname: string;
    /** The contents of the search params.  */
    query: Record<string, any>;
    /** The key of the location.  */
    key: string;
    /** A tuple of [x, y] scroll position. */
    scrollPosition?: [number, number];
    /** The current search string. */
    search?: string;
    /** The current hash. */
    hash?: string;
    /** Any state that has been attached to the current location. */
    state?: any;
}

export interface RouterHistory {
    /** Returns an Integer representing the number of elements in the session history, including the currently loaded page. */
    length: number;
    /** The previously applied action. ("PUSH", "POP", "REPLACE") */
    action: string;
    /** The current location. */
    location: LocationSegments;
    /** Create a href from a location. */
    createHref: (location: LocationSegments) => string;
    /** Push a location (navigate) to a path or location.  */
    push: (
        path: string | LocationSegments,
        state?: any,
        updateScroll?: boolean,
    ) => void;
    /** Replace the current location with a path or location.  */
    replace: (
        path: string | LocationSegments,
        state?: any,
        updateScroll?: boolean,
    ) => void;
    /** Load a specific page from the session history. You can use it to move forwards and backwards through the history depending on the value of a parameter. */
    go: (delta: number) => void;
    /** Move back one page in the session history. It has the same effect as calling go(-1). If there is no previous page, this method call does nothing. */
    goBack: () => void;
    /** Move forward one page in the session history. It has the same effect as calling go(1). If there is no next page, this method call does nothing. */
    goForward: () => void;
    /** Block navigation. */
    block: (prompt?: string | Prompt) => () => void;
    /** Listen to all navigation events. */
    listen: (
        listener: (location: LocationSegments, acrion: string) => void,
    ) => () => void;
    /** The window that this history is attached to. */
    win: Window;
}

export interface MatchOptions {
    path?: Path;
    exact?: boolean;
    strict?: boolean;
}

export interface MatchResults {
    /** The path matcher this was matched against. */
    path: Path;
    /** The url that was passed to the matcher. */
    url: string;
    /** If the match was done with exact matching. */
    isExact: boolean;
    /** The params that were extracted from the url. */
    params: Record<string, string>;
}

/** @options */
export interface RouterOptions {
    /** The base path, that all routes stem from. */
    root?: string;
    /** How your routing should work. (default: browser) */
    historyType?: 'browser' | 'hash';
    /** Add a suffix to all titles. */
    titleSuffix?: string;
    /** Which document to route on. */
    document?: Document;
}

export interface Router {
    /** Initialize the router with options. Must be called before any route based rendering happens, or the router will auto-initialize with default options. */
    init(options?: RouterOptions): void;

    /** Access the router history. */
    readonly history: RouterHistory | null;

    /** The current location. */
    readonly location: LocationSegments | null;

    /** Fill a path string with passed parameters. */
    fillPath(path: string, parameters?: Record<string, string>): string;
}

export interface SearchParamTracker {
    /** The key of the search param. */
    key: string;
    /** The current value of the search param. */
    readonly value: string | undefined;
    /** Set the value of the search param. */
    set(value?: string): void;
    /** Remove the tracked parameter. */
    delete(): void;
}
