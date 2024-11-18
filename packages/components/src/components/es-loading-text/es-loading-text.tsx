import { theme } from '@kurrent-ui/theme';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

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

    private renderedLength: number = 12;

    componentWillLoad() {
        this.calcLength();
    }

    @Watch('variance')
    @Watch('expectedLength')
    calcLength() {
        this.renderedLength = this.variance
            ? Math.floor(Math.random() * this.variance) + this.expectedLength
            : this.expectedLength;
    }

    render() {
        return (
            <Host role={'presentation'} dark={theme.isDark()}>
                {' '.repeat(this.renderedLength)}
            </Host>
        );
    }
}
