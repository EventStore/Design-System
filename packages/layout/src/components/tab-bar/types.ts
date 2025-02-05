import type { Tab } from '@kurrent-ui/components';

export interface RouteTab extends Tab {
    /** The url the tab should link to & match */
    url?: string;
    /** If the url should be matched in exact mode */
    exact?: boolean;
}
