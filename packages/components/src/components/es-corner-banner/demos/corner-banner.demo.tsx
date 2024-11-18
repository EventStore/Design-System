import { Component, h, Host } from '@stencil/core';

/** Corner Banner */
@Component({
    tag: 'es-corner-banner-demo',
    styleUrl: './corner-banner-demo.css',
    shadow: true,
})
export class Demo {
    private banners = [
        ['error', 'top', 'left'],
        ['warning', 'top', 'right'],
        ['success', 'bottom', 'left'],
        ['info', 'bottom', 'right'],
    ] as const;

    render() {
        return (
            <Host>
                {this.banners.map(([variant, y, x]) => (
                    <div class={'card'}>
                        <es-corner-banner variant={variant} y={y} x={x}>
                            {'Coming Soon'}
                        </es-corner-banner>
                        {`${variant}`}
                        <br />
                        {`${y} ${x}`}
                    </div>
                ))}
            </Host>
        );
    }
}
