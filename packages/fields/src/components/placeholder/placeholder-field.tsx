import { Component, h, Prop } from '@stencil/core';

import { Field } from 'components/Field';

/**
 * Can be displayed if a field isn't available yet
 * @part checkbox-field - Checkbox Field.
 */
@Component({
    tag: 'f2-placeholder-field',
    styleUrl: 'placeholder-field.css',
    shadow: true,
    formAssociated: true,
})
export class PlaceholderField {
    /** The label of the field. */
    @Prop() label!: string;

    /** Inline documentation text. */
    @Prop() documentation?: string;
    /** Inline documentation link. */
    @Prop() documentationLink?: string;
    /** Inline documentation link text. */
    @Prop() documentationLinkText?: string;

    render() {
        return (
            <Field
                label={this.label}
                documentation={this.documentation}
                documentationLink={this.documentationLink}
                documentationLinkText={this.documentationLinkText}
            >
                <slot />
            </Field>
        );
    }
}
