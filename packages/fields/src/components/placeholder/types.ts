/** An option to be selected */
export interface MultiCheckboxOption {
    /** The string to be used as a value. */
    value: string;
    /** A name to display. */
    name: string;
    /** If the option is disabled. */
    disabled?: boolean;
    /** Other values associated with the option. */
    [key: string]: any;
}
