/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Signs = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M5 4v4h14l2-2-2-2H5ZM19 11.5v4H5l-2-2 2-2h14ZM12 15.5V22M12 8v3.5M12 2v2M9.5 22h5" />
    </svg>
);
