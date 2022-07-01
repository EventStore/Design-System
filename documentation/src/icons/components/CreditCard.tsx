/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const CreditCard = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M22 9V4H2v5M22 9H2v11h20V9ZM6 14.5h1M10 14.5h1M14 14.5h1" />
    </svg>
);
