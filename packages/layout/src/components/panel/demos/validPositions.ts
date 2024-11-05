import type { TargetableArea, TargetableEdge } from '../types';

type Edges = TargetableEdge[];

const verticalStarts: Edges = ['header', 'banner', 'body', 'panel', 'cookie'];
const verticalEnds: Edges = ['header', 'banner', 'body', 'panel', 'cookie'];
const horizontalStarts: Edges = ['edge', 'sidebar', 'body', 'toolbar'];
const horizontalEnds: Edges = ['sidebar', 'body', 'toolbar', 'edge'];

export const areas: Array<[area: TargetableArea, starts: Edges, ends: Edges]> =
    [
        ['panel', horizontalStarts, horizontalEnds],
        ['toolbar', verticalStarts, verticalEnds],
        ['banner', horizontalStarts, horizontalEnds],
        ['header', horizontalStarts, horizontalEnds],
        ['sidebar', verticalStarts, verticalEnds],
        ['cookie', horizontalStarts, horizontalEnds],
    ];
