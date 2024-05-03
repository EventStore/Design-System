export type TargetableArea =
    | 'banner'
    | 'sidebar'
    | 'panel'
    | 'toolbar'
    | 'cookie';

export type TargetableEdge = TargetableArea | 'edge' | 'body';

export type ClosedMode = 'none' | 'collapsed';
export type PanelMode = 'inline' | 'collapsed';

export interface PanelDetails {
    mode: PanelMode;
    area: TargetableArea;
}

export type PanelDetailsListener = (panel: PanelDetails) => void;
