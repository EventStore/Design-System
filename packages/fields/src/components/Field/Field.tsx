import { h, FunctionalComponent } from '@stencil/core';
import { ValidationMessages } from '../../types';

interface FieldProps {
    label: string;
    messages?: ValidationMessages;
    invalid?: boolean;
}

export const Field: FunctionalComponent<FieldProps> = (
    { label, messages, invalid = false },
    children,
) => (
    <label class={{ field: true, invalid }}>
        <span class={'label'}>{label}</span>
        {children}
        <es-validation-messages messages={messages} />
    </label>
);
