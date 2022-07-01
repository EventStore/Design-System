/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Eye = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M12 18c5.523 0 10-6 10-6s-4.477-6-10-6-10 6-10 6 4.477 6 10 6Z" />
        <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
);
