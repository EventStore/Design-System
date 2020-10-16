export type Level = 'success' | 'info' | 'warning' | 'error';
export interface Bread {
    level: Level;
    icon?: string;
    title: string;
    message: string;
    onClick?: (e: MouseEvent) => void;
    duration?: number;
}

export interface Toast extends Required<Omit<Bread, 'onClick'>> {
    id: string;
    count: number;
    timeout: ReturnType<typeof setTimeout>;
    onClick?: (e: MouseEvent) => void;
}
