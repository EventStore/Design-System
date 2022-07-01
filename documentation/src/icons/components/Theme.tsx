/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Theme = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M17 2.5H3V10h14V2.5z" />
        <path d="M17 6h4.5v8.1l-12 1.6v5.9" />
    </svg>
);
