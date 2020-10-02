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
    onClick?: (e: MouseEvent) => void | boolean;
    [key: string]: any;
}

export const Link: FunctionalComponent<LinkProps> = (
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
        onClick,
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
            data-router={'yes'}
            onClick={(e: MouseEvent) => {
                const cancel = onClick?.(e);

                if (
                    cancel === false ||
                    disabled ||
                    forceRefresh ||
                    isModifiedEvent(e) ||
                    !url
                ) {
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
