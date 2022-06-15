/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Utils = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M3 7c0-5 4-5 4-5v10H3V7ZM21 5H7v3h14V5ZM3 15h18s0 4-3 4h-3.5l1 3h-9l1-3H3v-4Z" />
    </svg>
);
