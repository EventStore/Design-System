/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Required = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M7.5 12h9M9.75 8.103l4.5 7.794M14.25 8.103l-4.5 7.794" />
    </svg>
);
