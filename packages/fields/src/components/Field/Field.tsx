import { h, FunctionalComponent } from '@stencil/core';
import type { ValidationMessages } from '../../types';

export interface FieldProps {
    /** The label of the field. */
    label: string;
    /** The messages to display under the field. */
    messages?: ValidationMessages;
    /** If the field is currently invalid. */
    invalid?: boolean;
}

/** Default layout for a Field. */
export const Field: FunctionalComponent<FieldProps> = (
    { label, messages, invalid = false },
    children,
) => (
    <label class={{ field: true, invalid }}>
        <span class={'label'} part={'label'}>
            {label}
        </span>
        {children}
        <es-validation-messages messages={messages} />
    </label>
);
