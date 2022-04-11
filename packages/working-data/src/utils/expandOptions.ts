import type {
    WorkingDataOptions,
    InternalWorkingDataOptions,
    InternalFieldOptions,
    WorkingData,
} from '../types';
import { defaultCheckExists } from './defaultCheckExists';
import { isWorkingData } from './isWorkingData';

const defaults: InternalFieldOptions<any, any> = {
    initialValue: null,
    checkExists: defaultCheckExists,
    optional: () => false,
    message: 'Field is required',
    validations: [],
};

export const expandOptions = <T>(
    options: WorkingDataOptions<T>,
): InternalWorkingDataOptions<T> => {
    const expandedOptions: Record<
        string,
        InternalFieldOptions<any, any> | WorkingData<any>
    > = {};

    for (const [key, value] of Object.entries<any>(options)) {
        if (isWorkingData(value)) {
            expandedOptions[key] = value;
        } else if (
            value != null &&
            typeof value === 'object' &&
            'initialValue' in value
        ) {
            expandedOptions[key] = {
                ...defaults,
                ...value,
                optional:
                    typeof value.optional === 'boolean'
                        ? () => value.optional
                        : value.optional ?? defaults.optional,
            };
        } else {
            expandedOptions[key] = {
                ...defaults,
                initialValue: value,
            };
        }
    }

    return expandedOptions as any;
};
