import type { ToastOptions, ToastLevel } from '../components/toast/types';

const popToast = (level: ToastLevel) => (
    options: ToastOptions,
    targetDocument: Document = document,
) => {
    let toaster = targetDocument.querySelector('es-toaster');

    if (!toaster) {
        toaster = targetDocument.createElement('es-toaster');
        targetDocument.body.appendChild(toaster);
    }

    return toaster.popToast(level, options);
};

/**
 * Pops a toast notification at various levels. Automatically groups toasts with the same level, title and message.
 * @usage ./toast.example.md
 */
export const toast = {
    /** Called on a successful action. */
    success: popToast('success'),
    /** Called to give neutral information. */
    info: popToast('info'),
    /** Called to give a warning about something. */
    warning: popToast('warning'),
    /** Called when an error occured, to inform the user. */
    error: popToast('error'),
};
