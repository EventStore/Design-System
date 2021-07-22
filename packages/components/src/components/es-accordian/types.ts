export type SectionVariant = 'default' | 'mega' | 'field' | 'text' | 'footer';

export interface AccordianSection {
    /**
     * The name of the section. Used as the slot identifier and id.
     */
    name: string;
    /**
     * Apply styling to a section
     * default: Default styling
     * mega: for containing es-mega-input
     * field: for containing inputs and other fields
     * text: for containing text blocks
     * footer: applies specific styles to inserted buttons
     */
    variant?: SectionVariant;
    /**
     * The title to display in the header
     */
    title?: string;
    /**
     * If the section should be collapseable
     */
    collapsable?: boolean;
    /**
     * If the section should be collapsed by default
     */
    defaultCollapsed?: boolean;
}
