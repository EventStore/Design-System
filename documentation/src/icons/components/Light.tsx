/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Light = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" d="M12 1.5v1.6" />
        <path
            fill-rule="evenodd"
            d="m19.4 4.6-1.1 1.1 1.1-1.1z"
            clip-rule="evenodd"
        />
        <path
            fill="none"
            stroke="currentColor"
            d="m19.4 4.6-1.1 1.1M22.5 12h-1.6"
        />
        <path
            fill-rule="evenodd"
            d="m19.4 19.4-1.1-1.1 1.1 1.1z"
            clip-rule="evenodd"
        />
        <path
            fill="none"
            stroke="currentColor"
            d="m19.4 19.4-1.1-1.1M12 22.5v-1.6"
        />
        <path
            fill-rule="evenodd"
            d="m4.6 19.4 1.1-1.1-1.1 1.1z"
            clip-rule="evenodd"
        />
        <path
            fill="none"
            stroke="currentColor"
            d="m4.6 19.4 1.1-1.1M1.5 12h1.6"
        />
        <path
            fill-rule="evenodd"
            d="m4.6 4.6 1.1 1.1-1.1-1.1z"
            clip-rule="evenodd"
        />
        <path
            fill="none"
            stroke="currentColor"
            d="m4.6 4.6 1.1 1.1M12 17.2c2.9 0 5.2-2.3 5.2-5.2S14.9 6.8 12 6.8 6.8 9.1 6.8 12s2.3 5.2 5.2 5.2z"
        />
    </svg>
);
