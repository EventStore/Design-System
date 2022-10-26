/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Dot = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    </svg>
);
