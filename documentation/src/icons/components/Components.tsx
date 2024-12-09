/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Components = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M7 10.5V17h6.5M10.5 7H17v6.5M2.5 10.5v-8h8v8h-8ZM13.5 21.5v-8h8v8h-8Z" />
    </svg>
);
