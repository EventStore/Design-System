import { h, type FunctionalComponent } from '@stencil/core';
import type { FieldProps } from './types';

/** Default layout for a Field. */
export const Field: FunctionalComponent<FieldProps> = (
    { label, messages, invalid = false },
    children,
) => (
    <label class={{ field: true, invalid }} part={'field'}>
        <span class={'label'} part={'label'}>
            {label}
        </span>
        {children}
        <es-validation-messages messages={messages} />
    </label>
);
