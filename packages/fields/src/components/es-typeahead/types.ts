import type { RenderFunction } from '../../types';

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
    renderInput: RenderFunction<[props: Record<string, any>]>;
    value: string[];
    open: boolean;
    filter: string;
    ref: (element?: HTMLElement) => void;
}

export type RenderTypeaheadField = RenderFunction<
    [params: RenderTypeaheadFieldParams]
>;

export type RenderTypeaheadOption<
    T extends TypeaheadOption = TypeaheadOption
> = RenderFunction<[option: T, chosen: boolean]>;

export type OptionFilter = (filter: string, option: TypeaheadOption) => boolean;
