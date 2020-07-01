import { h, FunctionalComponent } from '@stencil/core';
import { Path } from '../types';
import router from '../utils/internalRouter';
import { isModifiedEvent } from '../utils/dom-utils';

export interface LinkProps {
    url?: string;
    urlMatch?: Path;
    exact?: boolean;
    strict?: boolean;
    forceRefresh?: boolean;

    element?: string;

    activeClass?: string;
    class?: string | Record<string, boolean>;
    disabled?: boolean;
    [key: string]: any;
}

const Link: FunctionalComponent<LinkProps> = (
    {
        element: Element = 'a',
        url,
        urlMatch = url,
        exact,
        strict,
        forceRefresh = false,
        activeClass = 'link-active',
        class: classes = {},
        disabled,
        ...props
    },
    children,
) => {
    const match = router.match({ path: urlMatch, strict, exact });

    return (
        <Element
            href={disabled ? undefined : url}
            class={{
                [activeClass]: !!match,
                ...(typeof classes === 'string'
                    ? { [classes]: true }
                    : classes),
            }}
            disabled={disabled}
            aria-disabled={disabled}
            onClick={(e: MouseEvent) => {
                if (disabled || forceRefresh || isModifiedEvent(e) || !url) {
                    return;
                }

                e.preventDefault();

                const href = router.getUrl(url);
                router.history.push(href);
            }}
            {...props}
        >
            {children}
        </Element>
    );
};

export default Link;
