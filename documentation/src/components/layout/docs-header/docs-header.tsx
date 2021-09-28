import { Component, h, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';

@Component({
    tag: 'docs-header',
    styleUrl: 'docs-header.css',
    shadow: true,
})
export class Header {
    @Prop() background: HTMLDocsBackgroundElement['variant'] | 'none' =
        'default';

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
                    <docs-background variant={this.background} />
                )}
            </header>
        );
    }
}
