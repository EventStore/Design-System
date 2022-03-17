import { Component, h, Host, Prop, Watch, State } from '@stencil/core';
import { createLogger, HTTPError } from '@eventstore/utils';

const logger = createLogger(
    'ErrorState',
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
);

/**
 * Page error state, used to display unrecoverable errors to the user.
 * @slot illustration - An illustration for your error screen.
 */
@Component({
    tag: 'es-error-state',
    styleUrl: 'es-error-state.css',
    shadow: true,
})
export class ErrorState {
    /**
     * The unrecoverable error.
     * For a normal error, error.message will be displayed.
     * For a `HTTPError` from `@eventstore/utils` the details title and description will be shown.
     */
    @Prop() error!: Error;

    @State() name: string = 'An error has occured.';
    @State() description: string = 'Something has gone horribly wrong.';
    @State() statusCode: number = 0;

    async componentWillLoad() {
        await this.figureOutTheDetails(this.error);
    }

    @Watch('error')
    async figureOutTheDetails(error: Error) {
        logger.error(error);

        if (error instanceof HTTPError) {
            const details = await error.details();
            this.name = details.title ?? error.status;
            this.description = details.detail ?? error.message;
            this.statusCode = error.status;
        } else {
            this.name = 'An error has occured.';
            this.description = error.message;
        }
    }

    render() {
        return (
            <Host>
                <slot name={'illustration'} />
                <es-page-title>{this.name}</es-page-title>
                <p class={'body'}>{this.description}</p>
                <slot />
            </Host>
        );
    }
}
