import {
    Component,
    h,
    Host,
    State,
    Watch,
    Listen,
    Element,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import { cookieHeight, panelHeight } from '../../utils/LayoutVar';

const LS_KEY = 'es-panel-height';

/**
 * A panel. Automatically sets `--layout-panel-height` based on it's height, and when resized.
 * @part inner - The wrapping aside of the panel.
 */
@Component({
    tag: 'es-panel',
    styleUrl: 'es-panel.css',
    shadow: true,
})
export class Panel {
    @Element() host!: HTMLEsPanelElement;

    @State() height: number = 340;
    @State() dragging: boolean = false;

    componentWillLoad() {
        const previousHeight = parseFloat(localStorage.getItem(LS_KEY)!);

        if (!Number.isNaN(previousHeight)) {
            this.height = this.clamp(previousHeight);
        }

        this.setHeight(this.height);
    }

    @Watch('height') setHeight(height: number) {
        panelHeight.set(height);
    }

    @Listen('resize', { target: 'window' }) clampOnResize() {
        const clamped = this.clamp(this.height);

        if (clamped !== this.height) {
            this.height = clamped;
            this.savePanelHeight();
        }
    }

    disconnectedCallback() {
        panelHeight.reset();
    }

    render() {
        return (
            <Host>
                <div class={'handle'} onMouseDown={this.dragStart}>
                    <es-icon icon={[ICON_NAMESPACE, 'grip-lines']} />
                </div>
                <aside part={'inner'}>
                    <slot />
                </aside>
                {this.dragging && <div class={'cursor_guard'} />}
            </Host>
        );
    }

    private savePanelHeight = () => {
        localStorage.setItem(LS_KEY, `${this.height}`);
    };

    private clamp = (height: number) =>
        Math.max(Math.min(height, window.innerHeight / 1.5), 100);

    private dragStart = (e: MouseEvent) => {
        if (e.button !== 0) return;

        this.dragging = true;
        window.addEventListener('mousemove', this.move);
        window.addEventListener('mouseup', this.dragEnd);
    };

    private dragEnd = () => {
        this.dragging = false;
        window.removeEventListener('mousemove', this.move);
        window.removeEventListener('mouseup', this.dragEnd);
        this.savePanelHeight();
    };

    private move = (e: MouseEvent) => {
        e.preventDefault();
        this.height = this.clamp(
            window.innerHeight - e.clientY - cookieHeight.value,
        );
    };
}
