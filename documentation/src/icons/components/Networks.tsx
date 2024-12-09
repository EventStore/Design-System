/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Networks = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M6 17H2v4h4v-4ZM20 3H4v6h16V3ZM12 17V9" />
        <path d="M4 17v-4h16v4M22 17h-4v4h4v-4ZM14 17h-4v4h4v-4ZM7 6h1" />
    </svg>
);
