/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Edit = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M3.5 21h18M5.5 13.36V17h3.659L19.5 6.654 15.848 3 5.5 13.36Z" />
    </svg>
);
