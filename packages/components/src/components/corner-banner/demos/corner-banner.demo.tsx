import { Component, h, Host } from '@stencil/core';

/** Corner Banner */
@Component({
    tag: 'corner-banner-demo',
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
                        <c2-corner-banner variant={variant} y={y} x={x}>
                            {'Coming Soon'}
                        </c2-corner-banner>
                        {`${variant}`}
                        <br />
                        {`${y} ${x}`}
                    </div>
                ))}
            </Host>
        );
    }
}
