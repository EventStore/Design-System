export type PanelVariant = 'default' | 'no_pad';

export interface Tab {
    id: string;
    title: string;
    badge?: () => boolean;
    panelVariant?: PanelVariant;
}
