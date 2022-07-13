import { Component, h } from '@stencil/core';
import { theme } from '@eventstore-ui/theme';

@Component({
    tag: 'docs-background',
    styleUrl: 'docs-background.css',
    shadow: true,
})
export class background {
    render() {
        if (theme.isHighContrast()) return null;

        return (
            <svg
                id={'docs-background'}
                width={1920}
                height={1080}
                viewBox={'0 0 1280 800'}
                preserveAspectRatio={'xMidYMin meet'}
                xmlns={'http://www.w3.org/2000/svg'}
            >
                <circle class={'circle_1'} r={1280} cx={1848} cy={400} />
                <circle class={'circle_2'} r={400} cx={1150} cy={-250} />
                <circle class={'circle_3'} r={600} cx={-200} cy={1200} />
            </svg>
        );
    }
}
