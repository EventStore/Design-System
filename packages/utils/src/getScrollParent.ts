/**
 * Traverses the dom tree including shadow doms to find the first element that scrolls.
 */
export const getScrollParent = (child: Element): Element => {
    const scrollParent = (node: Element): Element => {
        const parent = findParent(node);

        if (!parent) {
            return document.scrollingElement || document.documentElement;
        }

        if (canScroll(parent)) return parent;

        return scrollParent(parent);
    };

    return scrollParent(child);
};

const findParent = (node: Element): Element =>
    node.assignedSlot
        ? node.assignedSlot.parentElement ??
          node.assignedSlot.parentNode?.parentElement ??
          (node.assignedSlot.getRootNode() as ShadowRoot).host
        : node.parentElement ??
          node.parentNode?.parentElement ??
          (node.getRootNode() as ShadowRoot).host;

const canScroll = (node: Element) => {
    const style = getComputedStyle(node, null);
    return (
        style.getPropertyValue('overflow') === 'scroll' ||
        style.getPropertyValue('overflow') === 'auto' ||
        style.getPropertyValue('overflow-y') === 'scroll' ||
        style.getPropertyValue('overflow-y') === 'auto' ||
        style.getPropertyValue('overflow-x') === 'scroll' ||
        style.getPropertyValue('overflow-x') === 'auto'
    );
};
