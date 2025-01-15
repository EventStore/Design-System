import type {
    ValidatedFormOptions,
    InternalValidatedFormOptions,
    InternalFieldOptions,
    ValidatedForm,
} from '../types';
import { defaultCheckExists } from './defaultCheckExists';
import { isValidatedForm } from './isValidatedForm';

const defaults: InternalFieldOptions<any, any> = {
    initialValue: null,
    checkExists: defaultCheckExists,
    optional: () => false,
    message: 'Field is required',
    validations: [],
    templated: false,
};

export const expandOptions = <T extends object>(
    options: ValidatedFormOptions<T>,
): InternalValidatedFormOptions<T> => {
    const expandedOptions: Record<
        string,
        InternalFieldOptions<any, any> | ValidatedForm<any>
    > = {};

    for (const [key, value] of Object.entries<any>(options)) {
        if (isValidatedForm(value)) {
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
