export interface PageViewEventDetail {
    title: string;
    url: string;
}

export type PageViewEvent = CustomEvent<PageViewEventDetail>;

declare global {
    interface WindowEventMap {
        'page-view': PageViewEvent;
    }
}

export const dispatchPageViewEvent = (detail: PageViewEventDetail) => {
    const event = new CustomEvent<PageViewEventDetail>('page-view', {
        bubbles: true,
        detail,
    });
    window.dispatchEvent(event);
};
