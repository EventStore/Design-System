import { h, Component } from '@stencil/core';

/** A footer for forms */
@Component({
    tag: 'f2-form-footer',
    styleUrl: 'form-footer.css',
    shadow: true,
})
export class FormFooter {
    render() {
        return <slot />;
    }
}
