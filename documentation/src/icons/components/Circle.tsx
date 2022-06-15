/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Circle = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
        stroke="currentColor"
    >
        <path d="M19.1 19.1C23 15.2 23 8.9 19.1 5S8.8 1.1 4.9 4.9 1 15.2 4.9 19.1s10.3 3.8 14.2 0z" />
    </svg>
);
