import { h, type FunctionalComponent } from '@stencil/core';
import { Action } from '@eventstore-ui/router';
import { dispatchPageViewEvent } from '../../utils/pageView';

export interface PageViewProps {
    /** The title of the page. Defaults to document.title */
    title?: string;
}

let prev: string;
let prevUrl: string;

/**
 * Emit a page-view event on render.
 */
export const PageView: FunctionalComponent<PageViewProps> = (props) => (
    <Action
        action={() => {
            const url = document.URL.toString();
            const title = props.title ?? document.title;
            if (title === prev && url === prevUrl) return;
            prevUrl = url;
            prev = title;
            dispatchPageViewEvent({
                title,
                url,
            });
        }}
    />
);
