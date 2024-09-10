import { h, type FunctionalComponent } from '@stencil/core';
import { ICON_NAMESPACE } from 'icons/namespace';
import type { FieldProps } from './types';

/** Default layout for a Field. */
export const Field: FunctionalComponent<FieldProps> = (
    {
        label,
        messages,
        invalid = false,
        documentation,
        documentationLink,
        documentationLinkText,
    },
    children,
) => (
    <label class={{ field: true, invalid }} part={'field'}>
        <span class={'label'} part={'label'}>
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
        </span>
        {children}
        <f2-validation-messages messages={messages} />
    </label>
);
