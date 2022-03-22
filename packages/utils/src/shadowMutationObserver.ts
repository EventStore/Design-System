export const shadowMutationObserver = (
    element: HTMLElement,
    callback: MutationCallback,
    options: MutationObserverInit = {
        childList: true,
        subtree: true,
    },
): MutationObserver => {
    const observer = new MutationObserver(callback);
    let el = element.getRootNode();
    while (el) {
        observer.observe(el, options);
        el = (el as ShadowRoot).host?.getRootNode();
    }
    return observer;
};
