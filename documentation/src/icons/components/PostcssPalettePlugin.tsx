/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const PostcssPalettePlugin = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M12 20.5c2.5 2.2 6.3 2 8.5-.5s2-6.3-.5-8.5c-.7-.6-1.6-1.1-2.5-1.3" />
        <path d="M6.5 10.2c-3.2.8-5.1 4.1-4.3 7.3s4.1 5.1 7.3 4.3 5.1-4.1 4.3-7.3c-.1-.2-.1-.5-.2-.7" />
        <path d="M12 14c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z" />
    </svg>
);
