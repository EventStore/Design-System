/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Refresh = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M5.6 18.4c3.5 3.5 9.2 3.5 12.7 0s3.5-9.2 0-12.7-9.2-3.5-12.7 0C4.8 6.5 3 8.5 3 8.5" />
        <path d="M3 4.5v4h4" />
    </svg>
);
