/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Head = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        stroke="currentColor"
    >
        <path
            fill="none"
            d="m12.6 22.3-1.5-3.8H8.2S6 18 6 16v-2.3l-1.7-.2 2.1-4.7s-1.1-4 2.9-6.4 14 0 9.5 10.3c0 0-1.7 3.1-.5 5.9l.6 1.2"
        />
        <ellipse cx="10.5" cy="9.2" rx=".7" ry=".4" />
    </svg>
);
