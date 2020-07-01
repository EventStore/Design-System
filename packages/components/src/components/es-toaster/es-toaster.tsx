import {
    Component,
    h,
    State,
    Method,
    Element,
    forceUpdate,
} from '@stencil/core';

export type Level = 'success' | 'info' | 'warning' | 'error';
export interface Bread {
    level: Level;
    icon?: string;
    title: string;
    message: string;
    duration?: number;
}

export interface Toast extends Required<Bread> {
    id: string;
    count: number;
    timeout: ReturnType<typeof setTimeout>;
}

@Component({
    tag: 'es-toaster',
    styleUrl: 'es-toaster.css',
    shadow: true,
})
export class EsToast {
    @Element() host!: HTMLEsToasterElement;
    @State() slices = new Map<string, Toast>();
    @State() loaf = new Map<string, HTMLEsToastElement>();

    private defaultIcons: Record<Level, string> = {
        success: 'check',
        info: 'info',
        warning: 'warning',
        error: 'error',
    };

    @Method() async popToast({
        message,
        title,
        level = 'error',
        duration = 5000,
        icon = this.defaultIcons[level],
    }: Bread) {
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
                count: 1,
                timeout: setTimeout(this.eatToast(id), duration),
            };

            this.slices.set(id, toast)!;
        }

        forceUpdate(this);
    }

    render() {
        return Array.from(
            this.slices,
            ([id, { count, level, title, message, icon }]) => (
                <es-toast
                    key={id}
                    level={level}
                    count={count}
                    icon={icon}
                    ref={this.captureToast(id)}
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
