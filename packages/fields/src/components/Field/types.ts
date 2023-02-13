import type { ValidationMessages } from '../../types';

export interface FieldProps {
    /** The label of the field. */
    label: string;
    /** The messages to display under the field. */
    messages?: ValidationMessages;
    /** If the field is currently invalid. */
    invalid?: boolean;
}
