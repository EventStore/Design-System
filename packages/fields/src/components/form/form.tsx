import { h, Component } from '@stencil/core';

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
