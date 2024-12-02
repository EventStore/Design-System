import {
    Component,
    h,
    Host,
    State,
    Watch,
    Listen,
    Element,
    Prop,
    Event,
    type EventEmitter,
    Method,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import {
    bannerHeight,
    cookieHeight,
    headerHeight,
    headerUnderHeight,
    panelHeight,
    sidebarWidth,
    toolbarWidth,
} from '../../../utils/LayoutVar';
import type {
    ClosedMode,
    PanelMode,
    TargetableArea,
    TargetableEdge,
    PanelDetailsListener,
} from '../types';

/**
 * A resizable panel. Automatically sets the relevant layout var based on it's size and when resized.
 * @part inner - The wrapping aside of the panel.
 * @part handle - The grabbable handle
 * @part handle inline - The handle while inline
 * @part handle collapsed - The handle while collapsed
 * @part handle_icon - The handle grips icon
 */
@Component({
    tag: 'l2-panel',
    styleUrl: 'panel.css',
    shadow: true,
})
export class Panel {
    @Element() host!: HTMLL2PanelElement;

    /** Triggers when the panel's mode changes. */
    @Event() modeChange!: EventEmitter<PanelMode>;

    /** Where to place the panel. */
    @Prop({ reflect: true }) area: TargetableArea = 'panel';
    /**
     * Where to start the panel, inclusive.
     * Must be the opposite axis to the area.
     */
    @Prop({ reflect: true }) start?: TargetableEdge;
    /**
     * Where to end the panel, inclusive.
     * Must be the opposite axis to the area.
     */
    @Prop({ reflect: true }) end?: TargetableEdge;
    /** If the size of the panel should be kept in local storage. */
    @Prop() rememberSize?: string | false;
    /** If the last mode of the panel should be kept in local storage. */
    @Prop() rememberMode?: string | false;
    /** How the panel should respond to being closed. */
    @Prop() closedMode: ClosedMode = 'none';
    /** When to snap the panel closed (if a closed mode is set). */
    @Prop() closeAt: number = 100;
    /** The maximum possible size to resize to. */
    @Prop() maximumSize: number = Infinity;
    /** The minimum possible size to resize to. */
    @Prop() minimumSize: number = 100;
    /** What size to default to. */
    @Prop() defaultSize: number = 200;
    /** How large the panel should be when closed. */
    @Prop() closedSize: number = 34;

    @State() size: number = this.defaultSize;
    @State() dragging: boolean = false;
    @State() mode: PanelMode = 'inline';

    componentWillLoad() {
        this.initialize();
    }

    disconnectedCallback() {
        this.cssVar.reset();
    }

    initialize = () => {
        if (this.rememberSize !== false) {
            const previousSize = parseFloat(
                localStorage.getItem(this.localStorageSizeKey)!,
            );

            this.size = this.clamp(
                !Number.isNaN(previousSize) ? previousSize : this.defaultSize,
            );
        } else {
            this.size = this.clamp(this.defaultSize);
        }

        if (this.rememberMode !== false) {
            const previousMode = localStorage.getItem(
                this.localStorageModeKey,
            ) as PanelMode;
            this.mode =
                previousMode === this.closedMode ? previousMode : 'inline';
        } else {
            this.mode = 'inline';
        }

        this.setSize();
    };

    @Watch('area')
    reInit(_next: TargetableArea, prev: TargetableArea) {
        this.getCssVar(prev).reset();
        this.initialize();
    }

    @Watch('mode')
    @Watch('size')
    setSize() {
        switch (this.mode) {
            case 'inline':
                this.cssVar.set(this.size);
                break;
            case 'collapsed':
                this.cssVar.set(this.closedSize);
                break;
        }
    }

    @Listen('resize', { target: 'window' }) clampOnResize() {
        const clamped = this.clamp(this.size);

        if (clamped !== this.size) {
            this.size = clamped;
            this.savePanelSize();
        }
    }

    renderHandle = () => (
        <div
            class={'handle'}
            part={`handle ${this.mode} ${this.dragging ? 'active' : ''}`}
            onMouseDown={this.dragStart}
            onClick={this.handleClick}
            onDblClick={this.handleDoubleClick}
        >
            <slot name={'handle'}>
                <c2-icon
                    icon={[ICON_NAMESPACE, 'grip-lines']}
                    part={'handle_icon'}
                />
            </slot>
        </div>
    );

    render() {
        return (
            <Host mode={this.mode} style={{ '--panel-size': `${this.size}px` }}>
                {this.renderHandle()}
                <aside part={`inner ${this.mode}`}>
                    <slot />
                </aside>
                {this.dragging && <div class={'cursor_guard'} />}
            </Host>
        );
    }

    private savePanelSize = () => {
        if (this.rememberSize === false) return;
        localStorage.setItem(this.localStorageSizeKey, `${this.size}`);
    };

    private get localStorageSizeKey() {
        if (typeof this.rememberSize === 'string') {
            return this.rememberSize;
        }
        return `l2-panel-${this.area}-size`;
    }

    @Watch('mode')
    savePanelMode() {
        if (this.rememberMode === false) return;
        localStorage.setItem(this.localStorageModeKey, this.mode);
    }

    @Watch('mode')
    emitMode() {
        this.modeChange.emit(this.mode);
    }

    private get localStorageModeKey() {
        if (typeof this.rememberMode === 'string') {
            return this.rememberMode;
        }
        return `l2-panel-${this.area}-mode`;
    }

    private clamp = (requestedSize: number) => {
        if (this.closedMode !== 'none' && requestedSize < this.closeAt) {
            this.mode = this.closedMode;
        } else {
            this.mode = 'inline';
        }

        switch (this.area) {
            case 'header':
            case 'banner':
            case 'panel':
            case 'cookie': {
                const availableSpace =
                    Math.min(document.body.offsetHeight, innerHeight) -
                    headerHeight.value -
                    headerUnderHeight.value -
                    bannerHeight.value -
                    panelHeight.value -
                    cookieHeight.value +
                    this.cssVar.value -
                    100;
                const maximumSize = Math.min(availableSpace, this.maximumSize);
                return Math.max(
                    Math.min(requestedSize, maximumSize),
                    this.minimumSize,
                );
            }
            case 'sidebar':
            case 'toolbar': {
                const availableSpace =
                    Math.min(document.body.offsetWidth, innerWidth) -
                    sidebarWidth.value -
                    toolbarWidth.value +
                    this.cssVar.value -
                    400;
                const maximumSize = Math.min(availableSpace, this.maximumSize);
                return Math.max(
                    Math.min(requestedSize, maximumSize),
                    this.minimumSize,
                );
            }
        }
    };

    get cssVar() {
        return this.getCssVar(this.area);
    }

    private getCssVar = (area: TargetableArea) => {
        switch (area) {
            case 'header':
                return headerHeight;
            case 'panel':
                return panelHeight;
            case 'cookie':
                return cookieHeight;
            case 'banner':
                return bannerHeight;
            case 'sidebar':
                return sidebarWidth;
            case 'toolbar':
                return toolbarWidth;
        }
    };

    private offset = 0;
    private dragStart = (e: MouseEvent) => {
        if (e.button !== 0) return;
        // don't select text on double click
        if (e.detail > 1) e.preventDefault();

        if (this.mode === 'inline') {
            this.initialDragSize = this.size;
        }

        this.offset = this.calcSize(e.clientX, e.clientY) - this.cssVar.value;
        window.addEventListener('mousemove', this.move);
        window.addEventListener('mouseup', this.dragEnd);
    };

    private dragEnd = () => {
        this.dragging = false;
        window.removeEventListener('mousemove', this.move);
        window.removeEventListener('mouseup', this.dragEnd);

        if (this.mode !== 'inline') {
            this.closedAtSize = this.initialDragSize;
        }

        this.savePanelSize();
    };

    private calcSize = (x: number, y: number) => {
        const { top, right, bottom, left } = this.host.getBoundingClientRect();
        switch (this.area) {
            case 'header':
            case 'banner':
                return y - top;
            case 'panel':
            case 'cookie':
                return bottom - y;
            case 'sidebar':
                return x - left;
            case 'toolbar':
                return right - x;
        }
    };

    private move = (e: MouseEvent) => {
        e.preventDefault();
        this.dragging = true;
        this.size = this.clamp(
            this.calcSize(e.clientX, e.clientY) - this.offset,
        );
    };

    private closedAtSize?: number;
    private initialDragSize?: number;
    private handleClick = () => {
        if (this.mode === 'inline') return;
        this.size = this.clamp(this.closedAtSize ?? this.defaultSize);
        this.mode = 'inline';
    };
    private handleDoubleClick = () => {
        if (this.closedMode === 'none') return;
        this.mode = this.closedMode;
    };

    private detailsListeners = new Set<PanelDetailsListener>();

    @Watch('mode')
    @Watch('area')
    onModeChange() {
        this.detailsListeners.forEach((fn) =>
            fn({ area: this.area, mode: this.mode }),
        );
    }

    /** @internal */
    @Method()
    async attachPanelDetailsListener(listener: PanelDetailsListener) {
        listener({ area: this.area, mode: this.mode });
        this.detailsListeners.add(listener);
    }

    /** @internal */
    @Method()
    async detachPanelDetailsListener(listener: PanelDetailsListener) {
        this.detailsListeners.delete(listener);
    }
}
