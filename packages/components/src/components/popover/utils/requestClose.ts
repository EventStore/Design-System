/**
 * Can be called to close the popover that the `target` is contained in.
 * @usage ./requestClose.example.md
 */
export const requestClose = (target: EventTarget | null, reason?: string) => {
    if (!target) return;
    target.dispatchEvent(
        new CustomEvent('requestClose', {
            detail: reason,
            bubbles: true,
            cancelable: true,
            composed: true,
        }),
    );
};
