import {
    WorkingDataOptions,
    InternalWorkingDataOptions,
    InternalFieldOptions,
} from '../../types';
import { defaultCheckExists } from './defaultCheckExists';

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
    const expandedOptions: Record<string, InternalFieldOptions<any, T>> = {};

    for (const [key, value] of Object.entries<any>(options)) {
        if (
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
