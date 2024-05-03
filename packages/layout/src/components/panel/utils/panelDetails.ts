import type { PanelDetailsListener } from '../types';

export const bindPanelDetails = (
    el: HTMLElement,
    onModeChange: PanelDetailsListener,
) => {
    const parent = getPanelModeParent(el);
    parent?.attachPanelDetailsListener(onModeChange);

    return () => {
        parent?.detachPanelDetailsListener(onModeChange);
    };
};

interface PanelElement extends HTMLElement {
    attachPanelDetailsListener: (
        listener: PanelDetailsListener,
    ) => Promise<void>;
    detachPanelDetailsListener: (
        listener: PanelDetailsListener,
    ) => Promise<void>;
}

const getPanelModeParent = (child: Element): PanelElement | null => {
    const modeParent = (node: Element): PanelElement | null => {
        const parent = findParent(node);
        if (!parent) return null;
        if (isPanelModeElement(parent)) return parent;
        return modeParent(parent);
    };

    return modeParent(child);
};

const isPanelModeElement = (node: Element): node is PanelElement =>
    'attachPanelDetailsListener' in node &&
    'attachPanelDetailsListener' in node;

const findParent = (node: Element): Element =>
    node.assignedSlot
        ? node.assignedSlot.parentElement ??
          node.assignedSlot.parentNode?.parentElement ??
          (node.assignedSlot.getRootNode() as ShadowRoot).host
        : node.parentElement ??
          node.parentNode?.parentElement ??
          (node.getRootNode() as ShadowRoot).host;
