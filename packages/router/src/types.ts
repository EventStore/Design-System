export type Path = string | RegExp | Array<string | RegExp>;

export type Prompt = (location: LocationSegments, action: string) => string;

export interface RouteRenderProps {
    history: RouterHistory;
    match: MatchResults;
}

export interface RouteViewOptions {
    scrollTopOffset?: number;
    scrollToId?: string;
}

export interface LocationSegments {
    pathname: string;
    query: { [key: string]: any };
    key: string;
    scrollPosition?: [number, number];
    search?: string;
    hash?: string;
    state?: any;
}

export type HistoryType = 'browser' | 'hash';

export type LocationSegmentPart =
    | 'pathname'
    | 'search'
    | 'hash'
    | 'state'
    | 'key';

export type Listener = (...args: any[]) => void;

export interface RouterHistory {
    length: number;
    action: string;
    location: LocationSegments;
    createHref: (location: LocationSegments) => string;
    push: (path: string | LocationSegments, state?: any) => void;
    replace: (path: string | LocationSegments, state?: any) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    block: (prompt?: string | Prompt) => () => void;
    listen: (listener: Listener) => () => void;
    win: Window;
}

export interface MatchOptions {
    path?: Path;
    exact?: boolean;
    strict?: boolean;
}

export interface MatchResults {
    path: Path;
    url: string;
    isExact: boolean;
    params: {
        [key: string]: string;
    };
}
