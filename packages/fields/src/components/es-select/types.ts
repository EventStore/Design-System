import type { RenderFunction } from '../../types';
import type {
    RenderTypeaheadOption,
    TypeaheadOption,
} from '../es-typeahead/types';

export type RenderSelectValue<
    T extends TypeaheadOption = TypeaheadOption
> = RenderFunction<
    [
        /** The option currently selected */
        value: T | undefined,
        /** The ID of the option currently selected */
        rawValue: string,
    ]
>;

export type RenderSelectOption<
    T extends TypeaheadOption = TypeaheadOption
> = RenderTypeaheadOption<T>;
