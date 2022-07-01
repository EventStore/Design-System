/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Configs = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M22 8a6 6 0 0 1-8.805 5.305L4.5 22 2 19.5l8.695-8.695a6 6 0 0 1 8.11-8.11L15 6.5 17.5 9l3.805-3.805C21.75 6.032 22 6.987 22 8Z" />
    </svg>
);
