import { createLogger } from '@eventstore/utils';

import { SearchParamTracker } from '../types';
import { router } from './router';

export const logger = createLogger('searchParam', '#333');

class SearchParam implements SearchParamTracker {
    key: string;
    constructor(key: string) {
        this.key = key;
    }

    public get value(): string | undefined {
        if (!router.history) {
            logger.error(
                `Attemped to get "${this.key}"in search params before router was initialized`,
                this.key,
            );
            return;
        }
        return this.params.get(this.key) ?? undefined;
    }

    public set = (value?: string) => {
        if (value == null) return this.delete();

        if (!router.history) {
            logger.error(
                `Attemped to set "${this.key}" to "${value}" in search params before router was initialized`,
                this.key,
                value,
            );
            return;
        }

        const search = this.params;

        search.set(this.key, value);

        router.history.replace(
            {
                ...router.history.location,
                search: search.toString(),
            },
            undefined,
            false,
        );
    };

    public delete = () => {
        if (!router.history) {
            logger.error(
                `Attemped to remove "${this.key}" in search params before router was initialized`,
                this.key,
            );
            return;
        }

        const search = this.params;

        search.delete(this.key);

        router.history.replace({
            ...router.history.location,
            search: search.toString(),
        });
    };

    private get params(): URLSearchParams {
        return new URLSearchParams(router.history!.location.search);
    }
}

/**
 * Create a search param tracker, to set and update a search param in the current location.
 * @usage ./searchParam.usage.md
 */
export const searchParam = (key: string): SearchParamTracker =>
    new SearchParam(key);
