import { Component, h, State, Host, Element } from '@stencil/core';
import { router } from '@kurrent-ui/router';
import { usages, type PreviewSettings } from '../../../generated/usage';

type Status = 'loading' | 'ready' | 'error';

@Component({
    shadow: true,
    tag: 'preview-component',
    styleUrl: 'preview-component.css',
})
export class PreviewComponent {
    @Element() host!: HTMLPreviewComponentElement;

    @State() status: Status = 'loading';
    @State() error: unknown;
    @State() preview?: PreviewSettings;

    private observer = new MutationObserver(([mutation]) => {
        const frame = mutation.target as Element;
        this.loadPreview(frame.getAttribute('data-identifier'));
    });

    componentDidLoad() {
        router.init();

        const frame = window.frameElement;

        if (!frame) {
            this.status = 'error';
            this.error = 'Unable to access iframe';
            return;
        }

        this.loadPreview(frame.getAttribute('data-identifier'));
        this.observer.observe(frame, {
            attributeFilter: ['data-identifier'],
        });
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    render() {
        if (this.status === 'loading') {
            return <Host class={'loading'}>{'loading preview...'}</Host>;
        }

        if (this.status === 'error') {
            return <l2-display-error error={this.error} />;
        }

        const { component: Usage, grow, showLocation, styles } = this.preview!;
        return (
            <Host
                class={{
                    nav: showLocation,
                    grow: grow !== false,
                    no_styles: !styles,
                }}
            >
                {showLocation && (
                    <preview-usage-location
                        router={router}
                        location={router.location}
                    />
                )}
                <Usage />
            </Host>
        );
    }

    private loadPreview = async (identifier: string | null) => {
        try {
            this.status = 'loading';

            if (!identifier) {
                this.status = 'error';
                this.error = 'Failed to find identifier';
                return;
            }

            this.preview = await usages.get(identifier)?.();
            await this.adoptStyles();
            this.status = this.preview ? 'ready' : 'error';
            this.error = 'failed to load preview';
        } catch (error) {
            this.status = 'error';
            this.error = error;
        }
    };

    private adoptStyles = async () => {
        if (!this.preview?.styles) return;
        const styleSheet = new CSSStyleSheet();
        await styleSheet.replace(this.preview.styles);
        const shadow = this.host.shadowRoot!;
        shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, styleSheet];
    };
}
