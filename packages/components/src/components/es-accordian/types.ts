export type SectionVariant = 'default' | 'mega' | 'field' | 'text' | 'footer';

export interface AccordianSection {
    name: string;
    variant?: SectionVariant;
    title?: string;
    collapsable?: boolean;
    defaultCollapsed?: boolean;
}
