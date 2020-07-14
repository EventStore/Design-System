import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'es-footer',
    styleUrl: 'es-footer.css',
    shadow: true,
})
export class Footer {
    @Prop({
        attribute: 'no-sidebar',
        reflect: true,
    })
    noSidebar?: boolean;

    private year: string = new Date().getFullYear().toString();

    render() {
        return (
            <footer>
                <div class={'footer_top'}>
                    <slot />
                </div>
                <div class={'footer_bottom'}>
                    <span class={'footer_left'}>
                        <slot name={'bottom_left'}>
                            {'© '}
                            <time dateTime={this.year}>{this.year}</time>
                            {' Event Store Limited'}
                        </slot>
                    </span>
                    <nav class={'footer_right'}>
                        <slot name={'bottom_right'} />
                    </nav>
                </div>
            </footer>
        );
    }
}
