/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const IdCard = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />
        <path d="M18 8h-4v4h4V8ZM6 16h12M6 8h3M6 12h3" />
    </svg>
);
