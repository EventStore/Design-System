import {
    h,
    type FunctionalComponent,
    getRenderingRef,
    getElement,
    Fragment,
} from '@stencil/core';
import { PageTitle } from '@eventstore-ui/router';
import { setProgress } from '../loading-bar/utils/setProgress';
import { PageView } from '../PageView/PageView';

export type PageState = 'loading' | 'ready' | ['error', unknown];

export interface ErrorStateProps {
    error: unknown;
}

export interface PageProps {
    /** Sets the title of the document. */
    pageTitle: string;
    /** Displays breadcrumbs via `<l2-breadcrumb />` */
    crumbs?: HTMLL2BreadcrumbElement['crumbs'];
    /**
     * The current state of the page, used to decide what to render.
     * When the state of a page changes, a `pageStateChange` event is fired.
     */
    state?: PageState;
    /** Enables you to display a splash screen if the page has no content to display. */
    empty?: boolean;
    /** Empty state renderer. Used if `empty` is `true`, and `state` is "ready". */
    renderEmptyState?: FunctionalComponent;
    /** Error state renderer. Used if `state` is an Error. */
    renderErrorState?: FunctionalComponent<ErrorStateProps>;
    /** Loading state renderer. Used if `state` is an "loading".
     * If set to `false`, the component renders normally without a loading state.
     */
    renderLoadingState?: FunctionalComponent | false;
    /** Title for the header. Defaults to the passed `pageTitle`. Can be set to `false` to disable. */
    headerTitle?: string | false;
    /** Render to the right of the page header. */
    headerRight?: FunctionalComponent;
    /** Which progress bar to control via the page state. Defaults to "page". */
    progressBarId?: string;
}

const previousStates = new Map<string, PageState>();

const updateLoadingBar = (progressBarId: string, state: PageState) => {
    switch (state) {
        case 'loading':
            setProgress(progressBarId)(0);
            setProgress(progressBarId)(80);
            break;
        case 'ready':
            setProgress(progressBarId)(100);
            break;
        default:
            setProgress(progressBarId)(100, 'error');
            break;
    }
};

const updateElementState = (state: PageState) => {
    const ref = getRenderingRef();
    const element = getElement(ref);

    if (!element) return;

    element.dataset.state = typeof state === 'string' ? state : 'error';
    element.dispatchEvent(
        new CustomEvent('pageStateChange', {
            detail: state,
            bubbles: true,
            cancelable: true,
        }),
    );
};

const updateState = (progressBarId: string, state: PageState) => {
    const previousState = previousStates.get(progressBarId);
    if (state === previousState) return;
    updateLoadingBar(progressBarId, state);
    updateElementState(state);
    previousStates.set(progressBarId, state);
};

const BasicErrorState: FunctionalComponent<ErrorStateProps> = ({ error }) => (
    <l2-display-error error={error} />
);

const PageBody: FunctionalComponent<PageProps> = (
    {
        state = 'ready',
        empty = false,
        renderEmptyState: EmptyState = Fragment,
        renderLoadingState: LoadingState = Fragment,
        renderErrorState: ErrorState = BasicErrorState,
        pageTitle,
        headerTitle = pageTitle,
        headerRight: HeaderRight,
        progressBarId = 'page',
    },
    children,
) => {
    updateState(progressBarId, state);

    if (state === 'loading') {
        if (LoadingState !== false) return <LoadingState />;
    } else {
        if (Array.isArray(state)) return <ErrorState error={state[1]} />;
        if (empty) return <EmptyState />;
    }
    return (
        <>
            {(!!headerTitle || !!HeaderRight) && (
                <header>
                    {!!headerTitle && (
                        <l2-page-title>{headerTitle}</l2-page-title>
                    )}
                    {HeaderRight && (
                        <div class={'header_right'}>
                            <HeaderRight />
                        </div>
                    )}
                </header>
            )}
            {children}
        </>
    );
};

/**
 * Create a standard page.
 * Add `@import url('~@kurrent-ui/layout/css/page.css')` to the containing web component for styles.
 * @usage ./Page.usage.md
 */
export const Page: FunctionalComponent<PageProps> = (props, children) => (
    <>
        <PageTitle>{props.pageTitle}</PageTitle>
        <main
            ref={(ref) => ((document as any).main = ref)}
            class={{ loading: props.state === 'loading' }}
        >
            {props.crumbs && <l2-breadcrumb crumbs={props.crumbs} />}
            <PageBody {...props}>{children}</PageBody>
        </main>
        <PageView title={props.pageTitle} />
    </>
);
