import type { FunctionalComponent } from '@stencil/core';

/** What to display within a modal. */
export interface ConfirmModalOptions {
    /** Text to display above the heading. */
    preHeading: string;
    /** Text to display in the heading. */
    heading: string;
    /** Text or component to display in the body of the modal. */
    body: string | FunctionalComponent;
    /** Text to display in red below the body. */
    warning?: string;
    /** Text to display within the confirm button. */
    confirm: string;
}
