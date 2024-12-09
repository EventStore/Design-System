/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Rocket = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="m18.9 2.7.9.2c.7.1 1.2.6 1.3 1.2l.2.9c.7 3.5-.4 7.1-2.9 9.6l-3.9 3.9-9.1-9 3.9-3.9c2.5-2.5 6.1-3.6 9.6-2.9h0z" />
        <path d="M12.6 11.4c1.3 1.3 3.3 1.3 4.5 0 1.3-1.3 1.3-3.3 0-4.5-1.3-1.3-3.3-1.3-4.5 0s-1.3 3.2 0 4.5z" />
        <path d="m9.5 5.3-4.6.1-3.2 3.3 3.7.9 9.1 9.1.9 3.7 3.2-3.2.1-4.6M8 15.9l-2.3 2.3M4.3 13.7l-.8.8M10.3 19.7l-.8.8" />
    </svg>
);
