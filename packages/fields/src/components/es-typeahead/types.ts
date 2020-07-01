import { VNode, FunctionalComponent } from '@stencil/core';

export interface TypeaheadOption {
    name: string;
    value: string;
    [key: string]: any;
}

export interface RenderTypeaheadFieldParams {
    Input: FunctionalComponent<any>;
    value: string[];
    open: boolean;
    filter: string;
}

export type RenderTypeaheadField = (
    params: RenderTypeaheadFieldParams,
) => VNode | VNode[];

export type RenderTypeaheadOption = (
    option: TypeaheadOption,
    chosen: boolean,
) => VNode | VNode[] | string;

export type OptionFilter = (filter: string, option: TypeaheadOption) => boolean;
