export type ToastLevel = 'success' | 'info' | 'warning' | 'error';
export interface ToastOptions {
    /** Icon to display on left of the toast. Will default to default of level. */
    icon?: string;
    /** Title to be displayed on the toast. */
    title: string;
    /** Message to be displayed under the title. */
    message: string;
    /** Callback when toast is clicked. */
    onClick?: (e: MouseEvent) => void;
    /** How long to display the notification for before removing it.*/
    duration?: number;
}

export interface Toast extends Required<Omit<ToastOptions, 'onClick'>> {
    id: string;
    level: ToastLevel;
    count: number;
    timeout: ReturnType<typeof setTimeout>;
    onClick?: (e: MouseEvent) => void;
}
