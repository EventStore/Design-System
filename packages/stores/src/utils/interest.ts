import { debounce } from '@kurrent-ui/utils';
import { $interestFinders } from '../symbols';

interface Interested {
    update(): boolean;
    isConnected(): boolean;
}

const interestFinders = window[$interestFinders];

const allSubscriptions = new Set<
    Map<string | number | symbol, Set<Interested>>
>();

class InterestedParties<K> {
    private interested: Map<K, Set<Interested>> = new Map();

    public registerInterest = (key: K) => {
        for (const {
            getRenderingRef,
            forceUpdate,
            getElement,
        } of interestFinders) {
            const ref = getRenderingRef();

            if (!ref) continue;

            if (!this.interested.has(key)) {
                this.interested.set(key, new Set());
            }

            this.interested.get(key)!.add({
                update: () => forceUpdate(ref),
                isConnected: () => !!getElement(ref)?.isConnected,
            });
        }

        this.scheduleCleanup();
    };

    public inform = (key: K) => {
        if (!this.interested.has(key)) return;

        for (const el of this.interested.get(key)!) {
            const successfullyUpdated = el.update();

            if (!successfullyUpdated) {
                this.interested.get(key)?.delete(el);
                if (this.interested.get(key)?.size === 0) {
                    this.interested.delete(key);
                }
            }
        }

        this.scheduleCleanup();
    };

    public informAll = () => {
        for (const key of this.interested.keys()) {
            this.inform(key);
        }
        this.scheduleCleanup();
    };

    public clear = () => {
        this.interested.clear();
        this.scheduleCleanup();
    };

    private scheduleCleanup = debounce(() => {
        for (const subscription of allSubscriptions) {
            for (const [key, interested] of subscription) {
                for (const el of Array.from(interested)) {
                    if (el.isConnected()) continue;
                    subscription.get(key)?.delete(el);
                    if (subscription.get(key)?.size === 0) {
                        subscription.delete(key);
                    }
                }
            }
        }
    }, 2_000);
}

export const createInterestedParties = <K>() => new InterestedParties<K>();
