import { HTTPError } from '@eventstore/utils';
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
    } = createStores(fullOptions);
    const insertMessage = (
        key: keyof T,
        severity: Severity,
        message: string,
    ) => {
        if (!messages[key]) {
            logger.warn(`Unknown key "${key}" passed to validation messages`);
            return;
        }

        messages[key] = {
            ...messages[key],
            [severity]: [...messages[key][severity], message],
        };
    };
    let failedValidation = false;
    let validationTimeout: number;
    let forcingFocus = false;
    let awaiters: Array<(
        value?: boolean | PromiseLike<boolean> | undefined,
    ) => void> = [];
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
                    if (!optional) {
                        failures.add(key);
                        insertMessage(
                            key,
                            'error',
                            typeof requiredMessage === 'string'
                                ? requiredMessage
                                : requiredMessage(value, data),
                        );
                    }
                    continue;
                }
                validations.forEach(
                    ({ validator, message, severity = 'error' }) =>
                        promises.push(
                            (async () => {
                                const success = await validator(value, data);
                                if (success) return;
                                failures.add(key);
                                insertMessage(
                                    key,
                                    severity,
                                    typeof message === 'string'
                                        ? message
                                        : message(value, data),
                                );
                            })(),
                        ),
                );
            }
            await Promise.all(promises);
            failedValidation = !!failures.size;
            if (!failedValidation) return true;
            if (forceFocus) {
                for (const failure of failures) {
                    const ref = refs.get(failure);
                    if (!ref) continue;
                    ref.focus({ preventScroll: true });
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
        listen: (e) => {
            e.stopPropagation();
            if (state.frozen) return;
            const { name, value } = e.detail;
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
                            insertMessage(
                                key as keyof T,
                                'error',
                                message as string,
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
