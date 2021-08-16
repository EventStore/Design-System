import {
    Component,
    h,
    State,
    Method,
    Element,
    forceUpdate,
} from '@stencil/core';
import { Toast, ToastLevel, ToastOptions } from '../types';

/** @internal */
@Component({
    tag: 'es-toaster',
    styleUrl: 'es-toaster.css',
    shadow: true,
})
export class EsToast {
    @Element() host!: HTMLEsToasterElement;
    @State() slices = new Map<string, Toast>();
    @State() loaf = new Map<string, HTMLEsToastElement>();

    private defaultIcons: Record<ToastLevel, string> = {
        success: 'check',
        info: 'info',
        warning: 'warning',
        error: 'error',
    };

    @Method() async popToast(
        level: ToastLevel = 'error',
        {
            message,
            title,
            duration = 5000,
            icon = this.defaultIcons[level],
            onClick,
        }: ToastOptions,
    ) {
        const id = `${level}-${title}-${message}`;

        if (this.slices.has(id)) {
            const burningToast = this.slices.get(id)!;

            clearTimeout(burningToast.timeout);
            burningToast.count += 1;
            burningToast.duration = duration;
            burningToast.timeout = setTimeout(this.eatToast(id), duration);
        } else {
            const toast: Toast = {
                id,
                message,
                title,
                level,
                icon,
                duration,
                onClick,
                count: 1,
                timeout: setTimeout(this.eatToast(id), duration),
            };

            this.slices.set(id, toast);
        }

        forceUpdate(this);

        return () => {
            const toast = this.slices.get(id);
            if (!toast) return;
            clearTimeout(toast.timeout);
            this.eatToast(id)();
        };
    }

    render() {
        return Array.from(
            this.slices,
            ([id, { count, level, title, message, icon, onClick }]) => (
                <es-toast
                    key={id}
                    level={level}
                    count={count}
                    icon={icon}
                    onClick={onClick}
                    ref={this.captureToast(id)}
                    class={{ clickable: !!onClick }}
                >
                    <strong>{title}</strong>
                    <span>{message}</span>
                </es-toast>
            ),
        );
    }

    private captureToast = (id: string) => (ref?: HTMLEsToastElement) => {
        if (ref) {
            this.loaf.set(id, ref);
        } else {
            this.loaf.delete(id);
        }
    };

    private eatToast = (id: string) => async () => {
        const slice = this.loaf.get(id);

        await slice?.close();

        this.slices.delete(id);

        if (this.slices.size === 0) {
            this.host.parentNode?.removeChild(this.host);
        } else {
            forceUpdate(this);
        }
    };
}
