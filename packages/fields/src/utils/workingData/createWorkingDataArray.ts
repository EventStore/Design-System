import { createStore } from '@eventstore/stores';
import { delegateFocus, HTTPError } from '@eventstore/utils';
import { toast } from '@eventstore/components';

import { logger } from '../logger';
import type {
    Severity,
    FieldChangeEvent,
    ArrayOptions,
    WorkingDataArray,
    ValidationMessages,
} from '../../types';
import { expandArrayOptions, expandOptions } from './expandOptions';
import { blankMessages, createStores } from './createStores';
import { focusError, insertError, wDAKey } from '../../symbols';

type Key = ':root' | number;

type AWT<T> = {
    ':root': T[];
    [key: number]: T;
};

/**
 * Create a "Working Data Array" store to back an array within a "Working Data" store.
 */
export const createWorkingDataArray = <T>(
    options: ArrayOptions<T>,
): WorkingDataArray<T> => {
    const fullOptions = expandArrayOptions(options);
    const {
        state: { state: wd },
        refs,
        validationFailedCallbacks,
        beforeFocusCallbacks,
    } = createStores<AWT<T>>(
        expandOptions({ ':root': fullOptions.initialValue } as any),
    );

    const { state, reset, onChange } = createStore<{
        value: T[];
        messages: Record<number, ValidationMessages>;
        rootMessages: ValidationMessages;
    }>({
        value: fullOptions.initialValue,
        messages: {},
        rootMessages: blankMessages(),
    });

    const failures = new Set<Key>();

    let validationTimeout: number;
    let forcingFocus = false;
    let awaiters: Array<(value: boolean | PromiseLike<boolean>) => void> = [];

    const nameToIndex = (name: string) =>
        parseInt(name.replace(`${fullOptions.name}-`, ''));

    const resetMessages = () => {
        state.messages = {};
        state.rootMessages = blankMessages();
    };

    const processValidationFailure = (
        key: Key,
        severity: Severity,
        message: string,
        id: string,
    ) => {
        if (key !== ':root' && typeof key !== 'number') {
            logger.warn(`Unknown key "${key}" passed to validation failure`);
            return;
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

        failures.add(key);

        if (key === ':root') {
            state.rootMessages = {
                ...state.rootMessages,
                [severity]: [...state.rootMessages[severity], message],
            };
        } else {
            const messageGroup = state.messages[key] ?? blankMessages();
            messageGroup[severity].push(message);
            state.messages = {
                ...state.messages,
                [key]: messageGroup,
            };
        }
    };

    const insertValidationError = (
        [key, ...path]: string[],
        severity: Severity,
        message: string,
        id: string,
    ) => {
        if (key === ':root') {
            processValidationFailure(key, severity, message, id);
            return;
        }

        const numericKey = typeof key === 'string' ? nameToIndex(key) : key;

        if (!Number.isNaN(numericKey)) {
            failures.add(numericKey);
            processValidationFailure(numericKey, severity, message, id);
            return;
        }

        logger.warn(
            `Unknown keys "${[key, ...path].join(
                '.',
            )}" passed to validation failure`,
        );
        return;
    };

    const focusFirstError = async (): Promise<boolean> => {
        for (const key of failures) {
            const ref = refs.get(key === ':root' ? 0 : key);
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
        wd.frozen = true;
    };

    const unfreeze = () => {
        wd.frozen = false;
    };

    const set = (index: number, value: T) => {
        if (wd.frozen) return;

        const data = [...state.value];

        if (index === data.length) {
            data.push(value);
        } else {
            data[index] = value;
        }

        state.value = data;

        if (failures.size) {
            validate(false);
        }
    };

    const listen = (e: FieldChangeEvent<Record<string, T>>) => {
        e.stopPropagation();
        if (wd.frozen) return;
        const { name, value } = e.detail;

        const index = nameToIndex(name);

        if (Number.isNaN(index)) {
            logger.warn(`Unknown event "${name}" passed to listen`);
            return;
        }

        set(index, value);
    };

    const runValidation = async (forceFocus = true) => {
        resetMessages();
        failures.clear();
        const validationPromises: Promise<void>[] = [];
        try {
            const {
                maxLength,
                minLength,
                globalValidations,

                validations,
                valueOptional,
                requiredValueMessage,
                checkValueExists,
            } = fullOptions;

            const values = state.value;

            if (minLength && values.length < minLength.value) {
                failures.add(':root');
                processValidationFailure(
                    ':root',
                    'error',
                    typeof minLength.message === 'string'
                        ? minLength.message
                        : minLength.message(values),
                    'required',
                );
            }

            if (maxLength && values.length > maxLength.value) {
                failures.add(':root');
                processValidationFailure(
                    ':root',
                    'error',
                    typeof maxLength.message === 'string'
                        ? maxLength.message
                        : maxLength.message(values),
                    'required',
                );
            }

            globalValidations.forEach(
                ({ validator, message, severity = 'error', id }, i) =>
                    validationPromises.push(
                        (async () => {
                            const success = await validator(values);
                            if (success) return;

                            failures.add(':root');
                            processValidationFailure(
                                ':root',
                                severity,
                                typeof message === 'string'
                                    ? message
                                    : message(values),
                                id ?? `${i}`,
                            );
                        })(),
                    ),
            );

            for (let index = 0; index < values.length; index++) {
                const value = values[index];
                const exists = checkValueExists(value, values);

                if (!exists) {
                    if (!valueOptional(index, value)) {
                        failures.add(index);

                        processValidationFailure(
                            index,
                            'error',
                            typeof requiredValueMessage === 'string'
                                ? requiredValueMessage
                                : requiredValueMessage(value, values),
                            'required',
                        );
                    }
                    continue;
                }

                validations.forEach(
                    ({ validator, message, severity = 'error', id }, i) =>
                        validationPromises.push(
                            (async () => {
                                const success = await validator(
                                    value as any,
                                    values,
                                );
                                if (success) return;

                                failures.add(index);
                                processValidationFailure(
                                    index,
                                    severity,
                                    typeof message === 'string'
                                        ? message
                                        : message(value, values),
                                    id ?? `${i}`,
                                );
                            })(),
                        ),
                );
            }

            await Promise.all(validationPromises);

            if (!failures.size) return true;
            if (forceFocus) {
                await focusFirstError();
            }
        } catch (error) {
            logger.error('Validation Failed', error);
        }
        return false;
    };

    const validate = (forceFocus = true) => {
        return new Promise<boolean>((resolve) => {
            forcingFocus = forcingFocus || forceFocus;
            awaiters.push(resolve);
            clearTimeout(validationTimeout);
            validationTimeout = window.setTimeout(async () => {
                const success = await runValidation(forcingFocus);
                awaiters.forEach((resolve) => resolve(success));
                awaiters = [];
                forcingFocus = false;
            });
        });
    };

    return {
        get name() {
            return fullOptions.name;
        },
        get data() {
            return state.value;
        },
        get frozen() {
            return wd.frozen;
        },
        get messages() {
            return state.rootMessages;
        },
        get [wDAKey](): true {
            return true;
        },
        reset,
        delete: (index: number) => {
            if (wd.frozen) return;
            resetMessages();
            const root = [...state.value];
            root.splice(index, 1);
            state.value = root;
            if (failures.size) {
                validate(false);
            }
        },
        set,
        update: (value) => {
            resetMessages();
            state.value = value;
            if (failures.size) {
                validate(false);
            }
        },
        connect: (i) => ({
            name: `${fullOptions.name}-${i}`,
            value: state.value[i],
            invalid:
                !!state.messages[i]?.error?.length ||
                !!state.rootMessages.error?.length,
            messages: state.messages[i],
            onFieldchange: listen,
            ref: (r?: HTMLElement) => {
                if (r) {
                    refs.set(i, r);
                } else {
                    refs.delete(i);
                }
            },
        }),
        onChange: (onChange.bind(
            null,
            'value',
        ) as any) as WorkingDataArray<T>['onChange'],
        onValidationFailed: (key, callback) => {
            if (!validationFailedCallbacks.has(key)) {
                validationFailedCallbacks.set(key, new Set());
            }
            validationFailedCallbacks.get(key)?.add(callback as any);
            return () => {
                validationFailedCallbacks.get(key)?.delete(callback as any);
            };
        },
        onBeforeFocus: (callback) => {
            beforeFocusCallbacks.add(callback as any);
            return () => {
                beforeFocusCallbacks.delete(callback as any);
            };
        },
        listen,
        validate,
        submit: async (fn, { forceFocus = true } = {}) => {
            if (wd.frozen) return;
            freeze();
            if (await validate(forceFocus)) {
                try {
                    await fn(state.value);
                } catch (error) {
                    if (error instanceof HTTPError) {
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
        [focusError]: focusFirstError,
        [insertError]: insertValidationError,
    };
};
