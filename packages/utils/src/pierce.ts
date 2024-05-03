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

const isShadowRoot = (node: Node): node is ShadowRoot => {
    return node.nodeType === node.DOCUMENT_FRAGMENT_NODE;
};

const findMatches = <E extends Element>(
    elements: Element[],
    selector: string,
    pierce: boolean,
): E[] => {
    const matches: E[] = [];

    for (const $el of elements) {
        if ($el.matches(selector)) {
            matches.push($el as E);
        }

        if (!pierce) continue;

        if ($el.shadowRoot) {
            matches.push(
                ...piercingQuerySelectorAll<E>($el.shadowRoot, selector),
            );
        }

        if ($el.nodeName === 'SLOT') {
            matches.push(
                ...slottedQuerySelectorAll<E>($el as HTMLSlotElement, selector),
            );
        }
    }

    return matches;
};

/**
 * Searches for a (simple) selector throughout the shadow dow
 */
export const piercingQuerySelectorAll = <E extends Element>(
    /** The root element to search in */
    root: ParentNode,
    /** The selector to search for */
    selector: string,
): E[] => findMatches(Array.from(root.querySelectorAll('*')), selector, true);

/**
 * Searches slotted elements for matching
 */
export const slottedQuerySelectorAll = <E extends Element>(
    /** The slot to search in */
    $slot: HTMLSlotElement,
    /** The selector to match */
    selector: string,
    /** If we should pierce through the shadow dom of slotted elements */
    pierce: boolean = true,
): E[] => findMatches($slot.assignedElements(), selector, pierce);
