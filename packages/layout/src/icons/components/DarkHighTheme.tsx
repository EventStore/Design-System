/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const DarkHighTheme = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        stroke="currentColor"
        fill="currentColor"
    >
        <path d="M14 2.2c-3.4.9-5.4 4.4-4.5 7.8.9 3.4 4.4 5.4 7.8 4.5 2.2-.6 4-2.3 4.5-4.5.2.7.2 1.4.2 2 0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c.7 0 1.4.1 2 .2z" />
    </svg>
);
