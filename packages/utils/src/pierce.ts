/** Find closest parent matching selector, pierceing the shadow dom. */
export function closest<K extends keyof HTMLElementTagNameMap>(
    el: Element,
    selector: K,
): HTMLElementTagNameMap[K] | null;
export function closest<K extends keyof SVGElementTagNameMap>(
    el: Element,
    selector: K,
): SVGElementTagNameMap[K] | null;
export function closest<E extends Element = Element>(
    el: Element,
    selector: string,
): E | null;
export function closest(el: Element, selector: string) {
    const found = el.closest(selector);
    if (found) return found;
    const root = el.getRootNode();
    if (isShadowRoot(root)) {
        return closest(root.host, selector);
    }
    return null;
}

// Path: packages/utils/src/isShadowRoot.ts
const isShadowRoot = (node: Node): node is ShadowRoot => {
    return node.nodeType === node.DOCUMENT_FRAGMENT_NODE;
};
