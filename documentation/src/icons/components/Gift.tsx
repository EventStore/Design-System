/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Gift = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M20.5 22V10h-17v12h17ZM12 22V10M20.5 22h-17M22 6H2v4h20V6ZM8 2l4 4 4-4" />
    </svg>
);
