const tabbables = [
    'button:enabled',
    'select:enabled',
    'textarea:enabled',
    'input:enabled',

    'a[href]',
    'area[href]',

    'summary',
    'iframe',
    'object',
    'embed',

    'audio[controls]',
    'video[controls]',

    '[tabindex]',
    '[contenteditable]',
    '[autofocus]',
].join(',');

const keyboardSkips = ['[tabindex="-1"]'].join(',');
const delegationSkips = ['[data-skip-focus-delegation]', keyboardSkips].join(
    ',',
);

const isFocusable = (node: Node, skip?: string): boolean =>
    (node as HTMLElement).matches?.(tabbables) &&
    !(
        ((node as HTMLElement).tagName === 'INPUT' ||
            (node as HTMLElement).tagName === 'BUTTON') &&
        ((node as HTMLInputElement).type === 'hidden' ||
            (node as HTMLInputElement).disabled)
    ) &&
    !(skip && (node as HTMLElement).matches?.(skip));

const focusableElements = (
    el: Node | HTMLElement,
    skip?: string,
): HTMLElement[] => {
    if (isFocusable(el, skip)) {
        return [el as HTMLElement];
    }

    if (el.nodeName === 'SLOT') {
        return (el as HTMLSlotElement)
            .assignedNodes()
            .flatMap((n) => focusableElements(n, skip));
    }

    if ('shadowRoot' in el && el.shadowRoot) {
        return Array.from(el.shadowRoot.childNodes).flatMap((n) =>
            focusableElements(n, skip),
        );
    }

    return Array.from(el.childNodes).flatMap((n) => focusableElements(n, skip));
};

const activeElement = (
    el: Element | null = document.activeElement,
): HTMLElement | null => {
    if (!el || isFocusable(el)) return el as HTMLElement;
    if (el.shadowRoot) return activeElement(el.shadowRoot.activeElement);
    return null;
};

const orderedFocusableElements = (el: Node, skip?: string) =>
    focusableElements(el, skip).sort(
        (a, b) =>
            (a as HTMLElement).tabIndex ?? 0 - (b as HTMLElement).tabIndex ?? 0,
    );

const firstFocusable = (
    els: HTMLElement[],
    skip: string,
): HTMLElement | undefined => {
    if (!els.length) return;
    return els.find((el) => !el.matches(skip)) ?? els[0];
};

const lastFocusable = (els: HTMLElement[], skip: string) => {
    return firstFocusable(els.reverse(), skip);
};

export const delegateFocus = (el: HTMLElement, focusOptions?: FocusOptions) => {
    const els = orderedFocusableElements(el);
    const active = activeElement();
    if (active && els.includes(active)) return;
    firstFocusable(els, delegationSkips)?.focus(focusOptions);
};

export const focusFirst = (el: HTMLElement, focusOptions?: FocusOptions) => {
    const els = orderedFocusableElements(el);
    firstFocusable(els, keyboardSkips)?.focus(focusOptions);
};

export const focusLast = (el: HTMLElement, focusOptions?: FocusOptions) => {
    const els = orderedFocusableElements(el);
    lastFocusable(els, keyboardSkips)?.focus(focusOptions);
};

const isFragment = (node: Node): node is ShadowRoot =>
    node.nodeType === node.DOCUMENT_FRAGMENT_NODE;

type Doc = Document | DocumentFragment;

const hostPath = (node: Node) => {
    let host = node;
    let rootNode = node.getRootNode() as Doc;
    const path = new Map<Doc, Node>();

    path.set(rootNode, host);

    while (isFragment(rootNode)) {
        host = rootNode.host;
        rootNode = host.getRootNode() as Doc;
        path.set(rootNode, host);
    }

    return path;
};

export const trapFocus = (trap: HTMLElement, focusOptions?: FocusOptions) => {
    const previousFocus = activeElement();
    delegateFocus(trap, focusOptions);

    const onFocusOutside = (event: FocusEvent) => {
        event.preventDefault();

        const [trueTarget] = event.composedPath() as Node[];

        if (!trueTarget) {
            return delegateFocus(trap, focusOptions);
        }

        const trapPath = hostPath(trap);
        const targetPath = hostPath(trueTarget);

        const sharedDocument = Array.from(targetPath.keys()).find((doc) =>
            trapPath.has(doc),
        );

        if (!sharedDocument) {
            return delegateFocus(trap, focusOptions);
        }

        const targetHost = targetPath.get(sharedDocument)!;
        const trapHost = trapPath.get(sharedDocument)!;

        const position = trapHost.compareDocumentPosition(targetHost);

        if (position & document.DOCUMENT_POSITION_FOLLOWING) {
            return focusFirst(trap, focusOptions);
        }

        if (position & document.DOCUMENT_POSITION_PRECEDING) {
            return focusLast(trap, focusOptions);
        }

        return delegateFocus(trap, focusOptions);
    };

    const stopPropagation = (event: FocusEvent) => {
        event.stopPropagation();
    };

    const trapTab = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;
        const [trueTarget] = event.composedPath() as Node[];
        const els = orderedFocusableElements(trap, keyboardSkips);

        if (event.shiftKey) {
            if (els[0] === trueTarget) {
                event.preventDefault();
                event.stopPropagation();
                focusLast(trap, focusOptions);
            }
        } else if (els[els.length - 1] === trueTarget) {
            event.preventDefault();
            event.stopPropagation();
            focusFirst(trap, focusOptions);
        }
    };

    trap.addEventListener('focusin', stopPropagation);
    trap.addEventListener('keydown', trapTab, { capture: true });
    document.addEventListener('focusin', onFocusOutside);

    return (returnFocus: boolean | FocusOptions = true) => {
        trap.removeEventListener('focusin', stopPropagation);
        trap.removeEventListener('keydown', trapTab, { capture: true });
        document.removeEventListener('focusin', onFocusOutside);

        if (returnFocus) {
            previousFocus?.focus(
                typeof returnFocus === 'boolean' ? undefined : returnFocus,
            );
        }
    };
};
