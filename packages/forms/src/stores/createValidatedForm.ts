import { delegateFocus, HTTPError } from '@eventstore-ui/utils';
import { toast } from '@eventstore-ui/components';

import type {
    ValidatedFormOptions,
    ValidatedForm,
    Severity,
    FieldChangeEvent,
    ExtendOptions,
    FieldOptions,
    InternalFieldOptions,
    ValidationMessages,
    ValidateOn,
    ValidationMessage,
} from '../types';
import { focusError, insertError, triggerValidation, wDKey } from '../symbols';
import { logger } from '../utils/logger';
import { expandOptions } from '../utils/expandOptions';
import {
    addToValidationSets,
    blankMessages,
    createStores,
} from '../utils/createStores';
import { isValidatedForm } from '../utils/isValidatedForm';

/**
 * Create a "Working Data" store to back a form or set of fields.
 * Pass an object describing your data "`T`" with each value being one of:
 * - An inital value (required by default, uses default validation messages)
 * - a FieldOptions object, describing the field.
 * - Another ValidatedForm store
 * - A ValidatedFormArray store, to back an array.
 */
export const createValidatedForm = <T extends object>(
    options: ValidatedFormOptions<T>,
): ValidatedForm<T> => {
    const fullOptions = expandOptions(options);
    const {
        dataStore: { state: data, reset: resetData, onChange: onDataChange },
        messageStore: { state: messages, reset: resetMessages },
        templatedStore: { state: templated, reset: resetTemplated },
        state: { state },
        fields,
        refs,
        children,
        validationFailedCallbacks,
        beforeFocusCallbacks,
        validationSets,
    } = createStores(fullOptions);

    const failures = new Set<keyof T>();

    let failedSubmit = false;
    let validationTimeout: number;
    let forcingFocus = false;
    let awaiters: Array<(value: boolean | PromiseLike<boolean>) => void> = [];

    const fullData = (): T =>
        Array.from(fields.entries()).reduce<T>((acc, [key, field]) => {
            if (isValidatedForm(field)) {
                acc[key] = field.data;
            } else {
                acc[key] = data[key];
            }
            return acc;
        }, {} as T);

    const processValidationFailure = (
        key: keyof T,
        severity: Severity,
        message: ValidationMessage,
        id: string,
        index?: number,
    ) => {
        if (!messages[key]) {
            logger.warn(
                `Unknown key "${String(key)}" passed to validation failure`,
            );
            return;
        }

        // Expand the failed field, if allowed to edit
        if (templated[key] !== 'no-edit') {
            templated[key] = false;
        } else {
            logger.warn(
                `Validation failure in un-editable field "${String(key)}`,
            );
        }

        validationFailedCallbacks
            .get(key)
            ?.forEach((cb) =>
                cb({ id, severity, message, key }, refs.get(key)),
            );

        validationFailedCallbacks
            .get('*' as never)
            ?.forEach((cb) =>
                cb({ id, severity, message, key }, refs.get(key)),
            );

        if (index != null && !Number.isNaN(index)) {
            messages[key] = {
                ...messages[key],
                children: {
                    ...(messages[key].children ?? {}),
                    [index]: {
                        ...(messages[key].children?.[index] ?? {}),
                        [severity]: [
                            ...(messages[key].children?.[index]?.[severity] ??
                                []),
                            message,
                        ],
                    },
                },
            };
        } else {
            messages[key] = {
                ...messages[key],
                [severity]: [...messages[key][severity], message],
            };
        }
    };

    const insertValidationError = (
        [k, ...path]: string[],
        severity: Severity,
        message: string,
        id: string,
    ) => {
        const key = k as keyof T;
        const field = fields.get(key);

        if (isValidatedForm(field)) {
            failures.add(key);
            field[insertError](
                !path.length ? [':root'] : path,
                severity,
                message,
                id,
            );
            return;
        }

        if (key === ':root') {
            processValidationFailure(key, severity, message, id);
            return;
        }

        if (field) {
            failures.add(key);
            const index = path.length ? parseInt(path[0], 10) : undefined;
            processValidationFailure(key, severity, message, id, index);
            return;
        }

        logger.warn(
            `Unknown keys "${[k, ...path].join(
                '.',
            )}" passed to validation failure`,
        );
        return;
    };

    const focusFirstError = async (): Promise<boolean> => {
        for (const [key, field] of fields) {
            if (!failures.has(key)) continue;

            if (isValidatedForm(field)) {
                const focused = await field[focusError]();
                if (focused) return true;
                continue;
            }

            const ref = refs.get(key);
            const before = await Promise.all(
                Array.from(
                    beforeFocusCallbacks,
                    async (cb): Promise<boolean> => {
                        try {
                            const result = await cb(key, ref);
                            return typeof result === 'boolean' ? result : true;
                        } catch (error) {
                            return false;
                        }
                    },
                ),
            );

            if (!ref || !before.every(Boolean)) continue;

            delegateFocus(ref, { preventScroll: true });
            ref.scrollIntoView({ behavior: 'smooth', block: 'center' });

            return true;
        }

        return false;
    };

    const freeze = () => {
        state.frozen = true;
        children.forEach((d) => d.freeze());
    };

    const unfreeze = () => {
        state.frozen = false;
        children.forEach((d) => d.unfreeze());
    };

    const listen = (e: FieldChangeEvent<T>) => {
        e.stopPropagation();
        if (state.frozen) return;
        const { name, value } = e.detail;

        if (!fields.has(name)) {
            logger.warn(`Unknown event "${String(name)}" passed to listen`);
            return;
        }

        data[name] = value;

        validateUpdatedData();
    };

    const requestEdit = (e: CustomEvent<keyof T>) => {
        e.stopPropagation();
        if (state.frozen) return;
        const name = e.detail;

        if (!fields.has(name)) {
            logger.warn(
                `Unknown field "${String(name)}" passed to requestEdit`,
            );
            return;
        }

        if (templated[name] === 'no-edit') return;

        templated[name] = false;
    };

    const triggers: ValidateOn[] = ['submit', 'always'];
    const includeTriggers = (trigger: ValidateOn): Set<ValidateOn> => {
        return new Set(triggers.slice(triggers.indexOf(trigger)));
    };

    const runValidation = async (trigger: ValidateOn, forceFocus = true) => {
        const validationPromises: Promise<void>[] = [];
        const toValidate = validationSets[trigger];
        const triggers = includeTriggers(trigger);

        failures.clear();
        try {
            for (const [key, field] of fields) {
                if (isValidatedForm(field)) {
                    validationPromises.push(
                        (async () => {
                            const success = await field[triggerValidation](
                                trigger,
                                false,
                            );
                            if (success) return;
                            failures.add(key);
                        })(),
                    );
                    continue;
                }

                if (!toValidate.has(key)) continue;

                messages[key] = blankMessages();

                const {
                    optional,
                    checkExists,
                    message: requiredMessage,
                    validations,
                } = field;

                const value = data[key];
                const exists = checkExists(value, data);
                if (!exists) {
                    if (!optional(data) && trigger !== 'always') {
                        failures.add(key);

                        processValidationFailure(
                            key,
                            'error',
                            typeof requiredMessage === 'string'
                                ? requiredMessage
                                : requiredMessage(value, data),
                            'required',
                        );
                    }
                    continue;
                }

                for (const [
                    i,
                    {
                        validator,
                        message,
                        severity = 'error',
                        id,
                        validateOn = 'submit',
                        ...rest
                    },
                ] of validations.entries()) {
                    if (!triggers.has(validateOn)) {
                        continue;
                    }

                    if ((rest as any).callOnEach) {
                        if (!Array.isArray(value)) continue;
                        for (const [j, v] of (value as unknown[]).entries()) {
                            validationPromises.push(
                                (async () => {
                                    const success = await validator(v, data);
                                    if (success) return;
                                    if (severity === 'error') {
                                        failures.add(key);
                                    }
                                    processValidationFailure(
                                        key,
                                        severity,
                                        typeof message === 'string'
                                            ? message
                                            : message(value, data),
                                        id ?? `${i}`,
                                        j,
                                    );
                                })(),
                            );
                        }
                        continue;
                    }

                    validationPromises.push(
                        (async () => {
                            const success = await validator(value, data);
                            if (success) return;
                            if (severity === 'error') {
                                failures.add(key);
                            }
                            processValidationFailure(
                                key,
                                severity,
                                typeof message === 'string'
                                    ? message
                                    : message(value, data),
                                id ?? `${i}`,
                            );
                        })(),
                    );
                }
            }
            await Promise.all(validationPromises);

            const failed = !!failures.size;

            if (trigger === 'submit') {
                failedSubmit = failed;
                if (failed && forceFocus) {
                    await focusFirstError();
                }
            }

            return !failed;
        } catch (error) {
            logger.error('Validation Failed', error);
        }
        return false;
    };

    const validate = (event: ValidateOn, forceFocus = true) => {
        return new Promise<boolean>((resolve) => {
            forcingFocus = forcingFocus || forceFocus;
            awaiters.push(resolve);
            clearTimeout(validationTimeout);
            validationTimeout = window.setTimeout(async () => {
                const success = await runValidation(event, forcingFocus);
                awaiters.forEach((resolve) => resolve(success));
                awaiters = [];
                forcingFocus = false;
            });
        });
    };

    const validateUpdatedData = () => {
        // We are in post submit validation stage
        if (failedSubmit) {
            validate('submit', false);
        } else {
            validate('always', false);
        }
    };

    validate('always');

    return {
        get data() {
            return fullData();
        },
        get frozen() {
            return state.frozen;
        },
        get messages() {
            return Object.values<ValidationMessages>(
                messages,
            ).reduce<ValidationMessages>(
                (acc, field) => {
                    acc.error.push(...field.error);
                    acc.warning.push(...field.warning);
                    acc.info.push(...field.info);
                    return acc;
                },
                { error: [], warning: [], info: [] },
            );
        },
        get [wDKey](): true {
            return true;
        },
        reset: () => {
            resetData();
            resetMessages();
            resetTemplated();
            children.forEach((d) => d.reset());
        },
        update: (partial) => {
            if (state.frozen) return;
            for (const [key, value] of Object.entries<any>(partial)) {
                const wd = fields.get(key as keyof T);
                if (isValidatedForm(wd)) {
                    wd.update(value);
                } else {
                    (data as any)[key] = value;
                }
            }
            validateUpdatedData();
        },
        applyTemplate: (partial, valuesTemplated = true) => {
            if (state.frozen) return;
            for (const [key, value] of Object.entries<any>(partial)) {
                const wd = fields.get(key as keyof T);
                if (isValidatedForm(wd)) {
                    wd.applyTemplate(value, valuesTemplated);
                } else {
                    (data as any)[key] = value;
                    (templated as any)[key] = valuesTemplated;
                }
            }
            validateUpdatedData();
        },
        set: (key, value, options = {}) => {
            if (state.frozen) return;
            data[key] = value;

            if (options.templated != null) {
                templated[key] = options.templated;
            }

            validateUpdatedData();
        },
        connect: (key: keyof T, ...args: any[]) => {
            const wd = fields.get(key);

            if (isValidatedForm(wd)) {
                if (args.length) {
                    return (wd.connect as any)(...args);
                }

                return {
                    name: key as string,
                    data: wd,
                };
            }

            if (!args.length) {
                return {
                    name: key as string,
                    value: data[key],
                    invalid: !!messages[key].error.length,
                    messages: messages[key],
                    onFieldchange: listen,
                    ref: (r?: HTMLElement) => {
                        if (r) {
                            refs.set(key, r);
                        } else {
                            refs.delete(key);
                        }
                    },
                    templated: templated[key],
                    onRequestEdit: requestEdit,
                };
            }

            throw new Error(`Bad path in formdata connect: ${[key, ...args]}`);
        },
        onChange: (propName, cb) =>
            onDataChange(propName, (newValue) => cb(newValue, data)),
        onValidationFailed: (key, callback) => {
            if (!validationFailedCallbacks.has(key)) {
                validationFailedCallbacks.set(key, new Set());
            }
            validationFailedCallbacks.get(key)?.add(callback);
            return () => {
                validationFailedCallbacks.get(key)?.delete(callback);
            };
        },
        onBeforeFocus: (callback) => {
            beforeFocusCallbacks.add(callback);
            return () => {
                beforeFocusCallbacks.delete(callback);
            };
        },
        listen,
        validate: (forceFocus) => validate('submit', forceFocus),
        submit: async (fn, { forceFocus = true } = {}) => {
            if (state.frozen) return;
            freeze();
            if (await validate('submit', forceFocus)) {
                try {
                    await fn(fullData());
                } catch (error) {
                    if (HTTPError.isHTTPError(error)) {
                        const {
                            title,
                            detail,
                            fields = {},
                        } = await error.details();
                        for (const [key, message] of Object.entries(fields)) {
                            insertValidationError(
                                key.split('.'),
                                'error',
                                message as string,
                                'submit',
                            );
                        }
                        failedSubmit = true;
                        toast.error({
                            title,
                            message: detail,
                        });
                        if (forceFocus) await focusFirstError();
                    } else {
                        logger.error(error);
                    }
                }
            }
            unfreeze();
        },
        freeze,
        unfreeze,
        extend: (options) => {
            for (const [k, value] of Object.entries(options)) {
                const key = k as keyof T;
                const field = fields.get(key);

                if (!field) {
                    logger.warn(
                        `Unknown key "${String(key)}" passed to extend`,
                    );
                    continue;
                }

                if (isValidatedForm(field)) {
                    field.extend(value as ExtendOptions<T[typeof key]>);
                    continue;
                }

                const options = value as Partial<
                    FieldOptions<T[typeof key], T>
                >;
                const expanded: InternalFieldOptions<T[typeof key], T> = {
                    ...field,
                    ...options,
                    optional:
                        typeof options.optional === 'boolean'
                            ? () => options.optional as boolean
                            : options.optional ?? field.optional,
                    validations: [
                        ...field.validations,
                        ...(options.validations ?? []),
                    ] as InternalFieldOptions<T[typeof key], T>['validations'],
                };

                addToValidationSets(
                    key as keyof T,
                    options.validations ?? [],
                    validationSets,
                );

                fields.set(key, expanded);
            }
        },

        [triggerValidation]: validate,
        [focusError]: focusFirstError,
        [insertError]: insertValidationError,
    };
};
