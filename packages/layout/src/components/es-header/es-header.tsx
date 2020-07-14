import { Component, h, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';

@Component({
    tag: 'es-header',
    styleUrl: 'es-header.css',
    shadow: true,
})
export class Header {
    @Prop() background: HTMLEsBackgroundElement['variant'] | 'none' = 'default';

    render() {
        return (
            <header>
                <slot name={'logo'}>
                    <Link url={'/'} title={'Home'}>
                        <es-logo />
                    </Link>
                </slot>

                <div class={'header_right'}>
                    <slot name={'right'} />
                </div>

                {this.background !== 'none' && (
                    <es-background variant={this.background} />
                )}
            </header>
        );
    }
}
