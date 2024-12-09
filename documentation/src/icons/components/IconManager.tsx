/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const IconManager = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M19 15H5a3 3 0 1 0 0 6h14a3 3 0 1 0 0-6ZM18 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 7l4.5-4.5L11 7l-4.5 4.5L2 7Z" />
    </svg>
);
