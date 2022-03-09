import type { VNode, FunctionalComponent } from '@stencil/core';

/** An option to be selected. */
export interface TypeaheadOption {
    /** The display name of the option. */
    name: string;
    /** The string to be used as a value. */
    value: string;
    /** Extra data on the option. */
    [key: string]: any;
}

export interface RenderTypeaheadFieldParams {
    Input: FunctionalComponent<any>;
    value: string[];
    open: boolean;
    filter: string;
    ref: (element?: HTMLElement) => void;
}

export type RenderTypeaheadField = (
    params: RenderTypeaheadFieldParams,
) => VNode | VNode[];

export type RenderTypeaheadOption = (
    option: TypeaheadOption,
    chosen: boolean,
) => VNode | VNode[] | string;

export type OptionFilter = (filter: string, option: TypeaheadOption) => boolean;
