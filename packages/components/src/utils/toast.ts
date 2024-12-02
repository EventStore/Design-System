import { HTTPError } from '@kurrent-ui/utils';
import type { ToastOptions, ToastLevel } from '../components/toast/types';

const popToast =
    (level: ToastLevel) =>
    (options: ToastOptions, targetDocument: Document = document) => {
        let toaster = targetDocument.querySelector('c2-toaster');

        if (!toaster) {
            toaster = targetDocument.createElement('c2-toaster');
            targetDocument.body.appendChild(toaster);
        }

        return toaster.popToast(level, options);
    };

/**
 * Pops a toast notification at various levels. Automatically groups toasts with the same level, title and message.
 * @usage ./toast.example.md
 */
export const toast = {
    /**
     * Called on a successful action.
     */
    success: popToast('success'),
    /**
     * Called to give neutral information.
     */
    info: popToast('info'),
    /**
     * Called to give a warning about something.
     */
    warning: popToast('warning'),
    /**
     * Called when an error occured, to inform the user.
     */
    error: popToast('error'),
    /**
     * Handles HTTPError instances specifically and displays them as error toasts.
     */
    async httpError(err: unknown, fallbackTitle: string) {
        if (HTTPError.isHTTPError(err)) {
            const { title, detail } = await err.details();
            popToast('error')({
                title: title || fallbackTitle,
                message: detail,
            });
        } else {
            popToast('error')({
                title: fallbackTitle,
                message: err instanceof Error ? err.message : String(err),
            });
        }
    },
};
