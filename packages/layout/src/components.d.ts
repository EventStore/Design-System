/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Crumb } from "./components/es-breadcrumb/types";
import { LoadingBarStatus } from "./components/es-loading-bar/types";
import { NavNode, NavTree } from "./components/es-nav/types";
export namespace Components {
    interface DevRoot {
    }
    interface EsBreadcrumb {
        /**
          * The breadcrumbs to the current page.
         */
        "crumbs": Crumb[];
        /**
          * Do not warn if the crumbs do not match the current router location. (Only warns in dev mode)
         */
        "noValidate": boolean;
    }
    interface EsErrorState {
        /**
          * The unrecoverable error. For a normal error, error.message will be displayed. For a `HTTPError` from `@eventstore/utils` the details title and description will be shown.
         */
        "error": Error;
    }
    interface EsHeader {
    }
    interface EsLoadingBar {
        /**
          * The bar's name, for use in `setProgress`
         */
        "name": string;
        /**
          * Set (and animate to) a progress.
         */
        "progress": (completion: number, status?: LoadingBarStatus) => Promise<void>;
    }
    interface EsLogo {
        /**
          * Height to constrain by.
         */
        "height": number;
        /**
          * Width to constrain by.
         */
        "width": number;
    }
    interface EsNav {
        /**
          * The `NavTree` data structure that the navigation menu will be built from..
         */
        "navTree": NavTree;
    }
    interface EsNavNode0 {
        "active": boolean;
        "node": NavNode;
        "toggleRequest": () => void;
    }
    interface EsNavNode1 {
        "active": boolean;
        "node": NavNode;
        "toggleRequest": () => void;
    }
    interface EsNavNode2 {
        "node": NavNode;
    }
    interface EsPageTitle {
    }
    interface EsThemeDropdown {
    }
    interface EsThemePicker {
    }
}
declare global {
    interface HTMLDevRootElement extends Components.DevRoot, HTMLStencilElement {
    }
    var HTMLDevRootElement: {
        prototype: HTMLDevRootElement;
        new (): HTMLDevRootElement;
    };
    interface HTMLEsBreadcrumbElement extends Components.EsBreadcrumb, HTMLStencilElement {
    }
    var HTMLEsBreadcrumbElement: {
        prototype: HTMLEsBreadcrumbElement;
        new (): HTMLEsBreadcrumbElement;
    };
    interface HTMLEsErrorStateElement extends Components.EsErrorState, HTMLStencilElement {
    }
    var HTMLEsErrorStateElement: {
        prototype: HTMLEsErrorStateElement;
        new (): HTMLEsErrorStateElement;
    };
    interface HTMLEsHeaderElement extends Components.EsHeader, HTMLStencilElement {
    }
    var HTMLEsHeaderElement: {
        prototype: HTMLEsHeaderElement;
        new (): HTMLEsHeaderElement;
    };
    interface HTMLEsLoadingBarElement extends Components.EsLoadingBar, HTMLStencilElement {
    }
    var HTMLEsLoadingBarElement: {
        prototype: HTMLEsLoadingBarElement;
        new (): HTMLEsLoadingBarElement;
    };
    interface HTMLEsLogoElement extends Components.EsLogo, HTMLStencilElement {
    }
    var HTMLEsLogoElement: {
        prototype: HTMLEsLogoElement;
        new (): HTMLEsLogoElement;
    };
    interface HTMLEsNavElement extends Components.EsNav, HTMLStencilElement {
    }
    var HTMLEsNavElement: {
        prototype: HTMLEsNavElement;
        new (): HTMLEsNavElement;
    };
    interface HTMLEsNavNode0Element extends Components.EsNavNode0, HTMLStencilElement {
    }
    var HTMLEsNavNode0Element: {
        prototype: HTMLEsNavNode0Element;
        new (): HTMLEsNavNode0Element;
    };
    interface HTMLEsNavNode1Element extends Components.EsNavNode1, HTMLStencilElement {
    }
    var HTMLEsNavNode1Element: {
        prototype: HTMLEsNavNode1Element;
        new (): HTMLEsNavNode1Element;
    };
    interface HTMLEsNavNode2Element extends Components.EsNavNode2, HTMLStencilElement {
    }
    var HTMLEsNavNode2Element: {
        prototype: HTMLEsNavNode2Element;
        new (): HTMLEsNavNode2Element;
    };
    interface HTMLEsPageTitleElement extends Components.EsPageTitle, HTMLStencilElement {
    }
    var HTMLEsPageTitleElement: {
        prototype: HTMLEsPageTitleElement;
        new (): HTMLEsPageTitleElement;
    };
    interface HTMLEsThemeDropdownElement extends Components.EsThemeDropdown, HTMLStencilElement {
    }
    var HTMLEsThemeDropdownElement: {
        prototype: HTMLEsThemeDropdownElement;
        new (): HTMLEsThemeDropdownElement;
    };
    interface HTMLEsThemePickerElement extends Components.EsThemePicker, HTMLStencilElement {
    }
    var HTMLEsThemePickerElement: {
        prototype: HTMLEsThemePickerElement;
        new (): HTMLEsThemePickerElement;
    };
    interface HTMLElementTagNameMap {
        "dev-root": HTMLDevRootElement;
        "es-breadcrumb": HTMLEsBreadcrumbElement;
        "es-error-state": HTMLEsErrorStateElement;
        "es-header": HTMLEsHeaderElement;
        "es-loading-bar": HTMLEsLoadingBarElement;
        "es-logo": HTMLEsLogoElement;
        "es-nav": HTMLEsNavElement;
        "es-nav-node-0": HTMLEsNavNode0Element;
        "es-nav-node-1": HTMLEsNavNode1Element;
        "es-nav-node-2": HTMLEsNavNode2Element;
        "es-page-title": HTMLEsPageTitleElement;
        "es-theme-dropdown": HTMLEsThemeDropdownElement;
        "es-theme-picker": HTMLEsThemePickerElement;
    }
}
declare namespace LocalJSX {
    interface DevRoot {
    }
    interface EsBreadcrumb {
        /**
          * The breadcrumbs to the current page.
         */
        "crumbs"?: Crumb[];
        /**
          * Do not warn if the crumbs do not match the current router location. (Only warns in dev mode)
         */
        "noValidate"?: boolean;
    }
    interface EsErrorState {
        /**
          * The unrecoverable error. For a normal error, error.message will be displayed. For a `HTTPError` from `@eventstore/utils` the details title and description will be shown.
         */
        "error": Error;
    }
    interface EsHeader {
    }
    interface EsLoadingBar {
        /**
          * The bar's name, for use in `setProgress`
         */
        "name": string;
    }
    interface EsLogo {
        /**
          * Height to constrain by.
         */
        "height"?: number;
        /**
          * Width to constrain by.
         */
        "width"?: number;
    }
    interface EsNav {
        /**
          * The `NavTree` data structure that the navigation menu will be built from..
         */
        "navTree": NavTree;
    }
    interface EsNavNode0 {
        "active": boolean;
        "node": NavNode;
        "toggleRequest": () => void;
    }
    interface EsNavNode1 {
        "active": boolean;
        "node": NavNode;
        "toggleRequest": () => void;
    }
    interface EsNavNode2 {
        "node": NavNode;
    }
    interface EsPageTitle {
    }
    interface EsThemeDropdown {
    }
    interface EsThemePicker {
    }
    interface IntrinsicElements {
        "dev-root": DevRoot;
        "es-breadcrumb": EsBreadcrumb;
        "es-error-state": EsErrorState;
        "es-header": EsHeader;
        "es-loading-bar": EsLoadingBar;
        "es-logo": EsLogo;
        "es-nav": EsNav;
        "es-nav-node-0": EsNavNode0;
        "es-nav-node-1": EsNavNode1;
        "es-nav-node-2": EsNavNode2;
        "es-page-title": EsPageTitle;
        "es-theme-dropdown": EsThemeDropdown;
        "es-theme-picker": EsThemePicker;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dev-root": LocalJSX.DevRoot & JSXBase.HTMLAttributes<HTMLDevRootElement>;
            "es-breadcrumb": LocalJSX.EsBreadcrumb & JSXBase.HTMLAttributes<HTMLEsBreadcrumbElement>;
            "es-error-state": LocalJSX.EsErrorState & JSXBase.HTMLAttributes<HTMLEsErrorStateElement>;
            "es-header": LocalJSX.EsHeader & JSXBase.HTMLAttributes<HTMLEsHeaderElement>;
            "es-loading-bar": LocalJSX.EsLoadingBar & JSXBase.HTMLAttributes<HTMLEsLoadingBarElement>;
            "es-logo": LocalJSX.EsLogo & JSXBase.HTMLAttributes<HTMLEsLogoElement>;
            "es-nav": LocalJSX.EsNav & JSXBase.HTMLAttributes<HTMLEsNavElement>;
            "es-nav-node-0": LocalJSX.EsNavNode0 & JSXBase.HTMLAttributes<HTMLEsNavNode0Element>;
            "es-nav-node-1": LocalJSX.EsNavNode1 & JSXBase.HTMLAttributes<HTMLEsNavNode1Element>;
            "es-nav-node-2": LocalJSX.EsNavNode2 & JSXBase.HTMLAttributes<HTMLEsNavNode2Element>;
            "es-page-title": LocalJSX.EsPageTitle & JSXBase.HTMLAttributes<HTMLEsPageTitleElement>;
            "es-theme-dropdown": LocalJSX.EsThemeDropdown & JSXBase.HTMLAttributes<HTMLEsThemeDropdownElement>;
            "es-theme-picker": LocalJSX.EsThemePicker & JSXBase.HTMLAttributes<HTMLEsThemePickerElement>;
        }
    }
}
