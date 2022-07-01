/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const SignIn = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M11.996 3H3v18h9" />
        <path d="M12.5 16.5 8 12l4.5-4.5M21 11.996H8" />
    </svg>
);
