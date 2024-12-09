/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Assets = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M11.5 21h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5.75" />
        <path d="M18.318 13.5c1.205 0 2.182.94 2.182 2.1 0 1.51-1.455 2.8-2.182 3.5-.485.467-1.09.933-1.818 1.4-.727-.467-1.333-.933-1.818-1.4-.728-.7-2.182-1.99-2.182-3.5 0-1.16.977-2.1 2.182-2.1.759 0 1.427.373 1.818.939a2.203 2.203 0 0 1 1.818-.939ZM7.5 7h8" />
    </svg>
);
