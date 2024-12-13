export type PanelVariant = 'default' | 'no_pad';

export interface Tab {
    /** The id of the tab. Used as the slot identifier and query parameter. */
    id: string;
    /** The title to be displayed in the tab. */
    title: string;
    /** Function to determine if a dot badge should be displayed. */
    badge?: () => boolean;
    /**
     * @deprecated No style difference
     * Apply styling to a panel:
     * - 'default': Default styling.
     * - 'no_pad': No padding.
     */
    panelVariant?: PanelVariant;
}
