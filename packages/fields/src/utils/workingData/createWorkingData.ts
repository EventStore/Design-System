import { delegateFocus, HTTPError } from '@eventstore/utils';
import { toast } from '@eventstore/components';
import { logger } from '../logger';
import { WorkingDataOptions, WorkingData, Severity } from '../../types';
import { expandOptions } from './expandOptions';
import { createStores } from './createStores';

export const createWorkingData = <T extends object>(
    options: WorkingDataOptions<T>,
): WorkingData<T> => {
    const fullOptions = expandOptions(options);
    const {
        dataStore: { state: data, reset: resetData, onChange },
        messageStore: { state: messages, reset: resetMessages },
        state: { state },
        fields,
        refs,
        validationFailedCallbacks,
        beforeFocusCallbacks,
    } = createStores(fullOptions);

    const processValidationFailure = (
        key: keyof T,
        severity: Severity,
        message: string,
        id: string,
    ) => {
        if (!messages[key]) {
            logger.warn(`Unknown key "${key}" passed to validation failure`);
            return;
        }

        validationFailedCallbacks
            .get(key)
            ?.forEach((cb) => cb({ id, severity, message }, refs.get(key)));

        messages[key] = {
            ...messages[key],
            [severity]: [...messages[key][severity], message],
        };
    };
    let failedValidation = false;
    let validationTimeout: number;
    let forcingFocus = false;
    let awaiters: Array<(value: boolean | PromiseLike<boolean>) => void> = [];
    const runValidation = async (forceFocus = true) => {
        resetMessages();
        const promises: Promise<void>[] = [];
        const failures = new Set<keyof T>();
        try {
            for (const [
                k,
                {
                    optional,
                    checkExists,
                    message: requiredMessage,
                    validations,
                },
            ] of fields) {
                const key = k as keyof T;
                const value = data[key];
                const exists = checkExists(value, data);
                if (!exists) {
                    if (!optional(data)) {
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
                validations.forEach(
                    ({ validator, message, severity = 'error', id }, i) =>
                        promises.push(
                            (async () => {
                                const success = await validator(value, data);
                                if (success) return;

                                failures.add(key);
                                processValidationFailure(
                                    key,
                                    severity,
                                    typeof message === 'string'
                                        ? message
                                        : message(value, data),
                                    id ?? `${i}`,
                                );
                            })(),
                        ),
                );
            }
            await Promise.all(promises);
            failedValidation = !!failures.size;
            if (!failedValidation) return true;
            if (forceFocus) {
                for (const key of fields.keys()) {
                    if (!failures.has(key)) continue;

                    const ref = refs.get(key);
                    if (!ref) continue;

                    const before = await Promise.all(
                        Array.from(
                            beforeFocusCallbacks,
                            async (cb): Promise<boolean> => {
                                try {
                                    const result = await cb(key, ref);
                                    return typeof result === 'boolean'
                                        ? result
                                        : true;
                                } catch (error) {
                                    return false;
                                }
                            },
                        ),
                    );

                    if (!before.every(Boolean)) continue;

                    delegateFocus(ref, { preventScroll: true });
                    ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    break;
                }
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
        get data() {
            return { ...data };
        },
        get frozen() {
            return state.frozen;
        },
        reset: () => {
            resetData();
            resetMessages();
        },
        update: (partial) => {
            if (state.frozen) return;
            for (const [key, value] of Object.entries(partial)) {
                (data as any)[key] = value;
            }
        },
        set: (key, value) => {
            if (state.frozen) return;
            data[key] = value;
        },
        connect: (key) => ({
            name: key as string,
            value: data[key],
            invalid: !!messages[key].error.length,
            messages: messages[key],
            ref: (r) => {
                if (r) {
                    refs.set(key, r);
                } else {
                    refs.delete(key);
                }
            },
        }),
        onChange,
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
        listen: (e) => {
            e.stopPropagation();
            if (state.frozen) return;
            const { name, value } = e.detail;

            if (!fields.has(name)) {
                logger.warn(`Unknown event "${name}" passed to listen`);
                return;
            }

            data[name] = value;

            if (failedValidation) {
                validate(false);
            }
        },
        validate,
        submit: async (fn, options = {}) => {
            if (state.frozen) return;
            state.frozen = true;
            if (await validate(options.forceFocus)) {
                try {
                    await fn({ ...data });
                } catch (error) {
                    if (error instanceof HTTPError) {
                        const {
                            title,
                            detail,
                            fields = {},
                        } = await error.details();
                        for (const [key, message] of Object.entries(fields)) {
                            processValidationFailure(
                                key.split('.').shift()! as keyof T,
                                'error',
                                message as string,
                                'submit',
                            );
                        }
                        toast.error({
                            title,
                            message: detail,
                        });
                    } else {
                        logger.error(error);
                    }
                }
            }
            state.frozen = false;
        },
        freeze: () => {
            state.frozen = true;
        },
        unfreeze: () => {
            state.frozen = false;
        },
    };
};
