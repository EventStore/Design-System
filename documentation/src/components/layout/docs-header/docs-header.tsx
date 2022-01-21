import { Component, h, Host } from '@stencil/core';
import { Link } from '@eventstore/router';
import { theme } from '@eventstore/theme';

@Component({
    tag: 'docs-header',
    styleUrl: 'docs-header.css',
    shadow: true,
})
export class Header {
    render() {
        return (
            <Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
                <header>
                    <slot name={'logo'}>
                        <Link url={'/'} title={'Home'}>
                            <es-logo />
                        </Link>
                    </slot>

                    <div class={'header_right'}>
                        <slot name={'right'} />
                    </div>

                    <docs-background />
                </header>
            </Host>
        );
    }
}
