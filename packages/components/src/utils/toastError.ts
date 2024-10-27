import { HTTPError } from '@eventstore-ui/utils';
import { toast } from './toast';

export async function toastError(err: unknown, fallbackTitle: string) {
    if (HTTPError.isHTTPError(err)) {
        const { title, detail } = await err.details();
        toast.error({
            title: title || fallbackTitle,
            message: detail,
        });
    } else {
        toast.error({
            title: fallbackTitle,
            message: err instanceof Error ? err.message : String(err),
        });
    }
}
