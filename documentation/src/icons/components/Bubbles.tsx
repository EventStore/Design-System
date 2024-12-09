/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Bubbles = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M17 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM6 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM14.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
);
