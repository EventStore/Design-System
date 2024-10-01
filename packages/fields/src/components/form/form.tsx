import { h, Component } from '@stencil/core';

/** A styling component for form fields */
@Component({
    tag: 'f2-form',
    styleUrl: 'form.css',
    shadow: false,
    scoped: true,
})
export class Form {
    render() {
        return (
            <form>
                <slot />
            </form>
        );
    }
}
