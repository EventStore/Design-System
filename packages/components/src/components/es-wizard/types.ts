export interface WizardPage {
    /** The id of the page. Used as the slot identifier and location prop. */
    id: string;
    /** The title to be displayed in the steps. */
    title: string;
    /** If the step is disabled.  */
    disabled?: true;
}
