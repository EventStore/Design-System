/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Stores = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M6 19.5h16v-16H6v4" />
        <path d="M14 11.5v-4H2v12h12" />
        <path d="M18 11.5h-8v8h8v-8z" />
    </svg>
);
