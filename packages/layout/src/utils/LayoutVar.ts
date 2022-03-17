class CssVar {
    private name: string;
    private default: string;

    constructor(name: string, defaults: CSSStyleDeclaration) {
        this.name = name;
        this.default = defaults.getPropertyValue(name);
    }

    public set = (to: number) => {
        document.documentElement.style.setProperty(this.name, `${to}px`);
    };

    public reset = () => {
        document.documentElement.style.setProperty(this.name, this.default);
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

/** Control the --layout-panel-height css var. */
export const panelHeight = new CssVar('--layout-panel-height', defaults);
