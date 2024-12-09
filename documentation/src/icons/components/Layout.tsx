/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Layout = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M21 9v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5H3V4Z" />
        <path
            fill="currentColor"
            fill-rule="evenodd"
            stroke="none"
            d="M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
        />
    </svg>
);
