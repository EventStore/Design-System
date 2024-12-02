/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const More = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="transparent"
    >
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
    </svg>
);
