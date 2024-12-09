/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const SignOut = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M11.996 3H3v18h9M16.5 16.5 21 12l-4.5-4.5M8 11.996h13" />
    </svg>
);
