import { logger } from './logger';

const LAYOUT_OBSERVER = Symbol.for('es-layout-observer');
const LAYOUT_OBSERVERS = Symbol.for('es-layout-observers');

type Observer = [varName: string, fn: (val: string) => void];

declare global {
    interface Window {
        [LAYOUT_OBSERVER]?: MutationObserver;
        [LAYOUT_OBSERVERS]?: Set<Observer>;
    }
}

window[LAYOUT_OBSERVERS] = window[LAYOUT_OBSERVERS] ?? new Set<Observer>();
window[LAYOUT_OBSERVER] =
    window[LAYOUT_OBSERVER] ??
    (() => {
        const layoutObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const target = mutation.target as HTMLElement;

                for (const [varName, fn] of window[LAYOUT_OBSERVERS]!) {
                    const val = target.style.getPropertyValue(varName);
                    fn(val);
                }
            }
        });

        layoutObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style'],
        });

        return layoutObserver;
    })();

export type VarObserver = (val: number) => void;

export class CssVar {
    private name: string;
    private default: string;

    private observers = new Set<VarObserver>();

    constructor(name: string, defaults: CSSStyleDeclaration) {
        this.name = name;
        this.default = defaults.getPropertyValue(name);
        window[LAYOUT_OBSERVERS]!.add([name, this.onChange]);
    }

    public set = (to: number) => {
        document.documentElement.style.setProperty(this.name, `${to}px`);
    };

    public reset = () => {
        document.documentElement.style.setProperty(this.name, this.default);
    };

    public observe = (fn: VarObserver) => {
        this.observers.add(fn);
        return () => {
            this.observers.delete(fn);
        };
    };

    private lastSeen?: string;
    private onChange = (val: string) => {
        if (val === this.lastSeen) return;
        this.lastSeen = val;
        const n = parseFloat(val || '0');
        for (const fn of this.observers) {
            try {
                fn(n);
            } catch (error) {
                logger.error(error);
            }
        }
    };
}

const defaults = getComputedStyle(document.documentElement);

/** Control the --layout-max-width css var. */
export const maxWidth = new CssVar('--layout-max-width', defaults);

/** Control the --layout-header-base-height css var. */
export const headerHeight = new CssVar('--layout-header-base-height', defaults);

/** Control the --layout-header-under-height css var. */
export const headerUnderHeight = new CssVar(
    '--layout-header-under-height',
    defaults,
);

/** Control the --layout-banner-height css var. */
export const bannerHeight = new CssVar('--layout-banner-height', defaults);

/** Control the --layout-sidebar-width css var. */
export const sidebarWidth = new CssVar('--layout-sidebar-width', defaults);

/** Control the --layout-toolbar-width css var. */
export const toolbarWidth = new CssVar('--layout-toolbar-width', defaults);

/** Control the --layout-panel-height css var. */
export const panelHeight = new CssVar('--layout-panel-height', defaults);
