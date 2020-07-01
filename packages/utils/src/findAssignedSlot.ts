export const findAssignedSlot = (el: HTMLElement): HTMLSlotElement | null => {
    if (el.assignedSlot) return el.assignedSlot;
    if (el.parentElement) return findAssignedSlot(el.parentElement);
    return null;
};
