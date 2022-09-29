import { Component, h, Host, Prop } from '@stencil/core';

/**
 * Displays a grey block to placehold loading text.
 */
@Component({
    tag: 'es-loading-text',
    styleUrl: 'es-loading-text.css',
    shadow: true,
})
export class EsLoadingText {
    /** The expected loaded text length. */
    @Prop() expectedLength!: number;
    /** Adds a random number of chars (up to the passed amount) */
    @Prop() variance?: number;

    render() {
        const renderedLength = this.variance
            ? Math.floor(Math.random() * this.variance) + this.expectedLength
            : this.expectedLength;
        return <Host role={'presentation'}>{' '.repeat(renderedLength)}</Host>;
    }
}
