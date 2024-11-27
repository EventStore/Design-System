/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ChevronDouble = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="m18 6-6 6-6-6M18 12l-6 6-6-6" />
    </svg>
);
