/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Assets = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4v18h16v2H4c-1.1 0-2-.9-2-2V4h2m11 3h5.5L15 1.5V7M8 0h8l6 6v12c0 1.11-.89 2-2 2H8a2 2 0 0 1-2-2V2c0-1.11.89-2 2-2m9 16v-2H8v2h9m3-4v-2H8v2h12Z" />
    </svg>
);
