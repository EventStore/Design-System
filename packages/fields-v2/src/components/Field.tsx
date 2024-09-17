import { h, type FunctionalComponent } from '@stencil/core';
import { ICON_NAMESPACE } from 'icons/namespace';

import type { ValidationMessages } from '../types';

export interface FieldProps {
    /** The label of the field. */
    label: string;
    /** The messages to display under the field. */
    messages?: ValidationMessages;
    /** If the field is currently invalid. */
    invalid?: boolean;
    /** Inline documentation text. */
    documentation?: string;
    /** Inline documentation link. */
    documentationLink?: string;
    /** Inline documentation link text. */
    documentationLinkText?: string;
    /** Allows you to set the outer element to something other thatn a label, to prevent nested labels */
    elements?: Partial<{
        outer:
            | string
            | FunctionalComponent<{
                  class: string | Record<string, boolean>;
                  part: string;
              }>;
        label:
            | string
            | FunctionalComponent<{
                  class: string | Record<string, boolean>;
                  part: string;
              }>;
    }>;
}

/** Default layout for a Field. */
export const Field: FunctionalComponent<FieldProps> = (
    {
        label,
        messages,
        invalid = false,
        documentation,
        documentationLink,
        documentationLinkText,
        elements: { outer: Outer = 'label', label: Label = 'span' } = {},
    },
    children,
) => (
    <Outer class={{ field: true, invalid }} part={'field'}>
        <Label class={'label'} part={'label'}>
            {label}
            <slot name={'documentation'}>
                {documentation != null && (
                    <span class={'documentation'} part={'documentation'}>
                        {documentation}
                        {documentationLink != null && (
                            <a
                                class={'documentation_link'}
                                href={documentationLink}
                                target={'_blank'}
                                rel={'noopener'}
                            >
                                {documentationLinkText ?? 'Find out more'}
                                <es-icon
                                    size={14}
                                    icon={[ICON_NAMESPACE, 'external-link']}
                                />
                            </a>
                        )}
                    </span>
                )}
            </slot>
        </Label>
        {children}
        <f2-validation-messages messages={messages} />
    </Outer>
);
