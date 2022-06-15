/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const UserEdit = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M12 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zM17.4 14.8C15.9 13.7 14 13 12 13c-5 0-9 4-9 9M21 22c0-1.8-.5-3.5-1.5-4.9" />
        <path d="M12.5 21.9h2.2l8-8-2.2-2.2-8 8v2.2zM18.3 13.9l2.2 2.2" />
    </svg>
);
