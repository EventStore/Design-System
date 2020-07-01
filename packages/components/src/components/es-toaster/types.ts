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
