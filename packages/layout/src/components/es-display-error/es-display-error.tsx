import { HTTPError } from '@eventstore-ui/utils';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { DisplayErrorVariant } from './types';

/**
 * Display an error to the user, with title and detail. Will automatically extract from HTTPError.
 * @slot illustration - Replace the illustration for your error.
 */
@Component({
    tag: 'es-display-error',
    styleUrl: 'es-display-error.css',
    shadow: true,
})
export class DisplayError {
    /**
     * The unrecoverable error.
     * For a normal error, error.message will be displayed.
     * For a `HTTPError` from `@eventstore-ui/utils` the details title and description will be shown.
     */
    @Prop() error: unknown;

    /** Which styling variant to use. */
    @Prop({ reflect: true }) variant: DisplayErrorVariant = 'page';

    @State() title: string = '';
    @State() detail: string = '';

    async componentWillLoad() {
        await this.parseError(this.error);
    }

    @Watch('error')
    async parseError(error: unknown) {
        if (HTTPError.isHTTPError(error)) {
            const { title, detail } = await error.details();
            this.title = title;
            this.detail = detail;
            return;
        }

        const isObject = !!error && typeof error === 'object';

        if (isObject && 'title' in error) {
            this.title = (error as any).title;
        } else {
            this.title = 'Something has gone wrong.';
        }

        if (isObject && 'detail' in error) {
            this.detail = (error as any).detail;
        } else if (error instanceof Error) {
            this.detail = error.message;
        } else {
            this.detail = String(error);
        }
    }

    render() {
        return (
            <Host>
                <slot name={'illustration'}>
                    <es-illustration-poo />
                </slot>
                <div class={'inner'}>
                    <h1>{this.title}</h1>
                    <span>{this.detail}</span>
                    <slot />
                </div>
            </Host>
        );
    }
}
