/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const GripLines = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M3.1 9.3H21M3.1 15.1H21" />
    </svg>
);
