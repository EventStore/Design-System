/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const GoBack = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12m16-1h-8l3.5-3.5-1.42-1.42L6.16 12l5.92 5.92 1.42-1.42L10 13h8v-2Z" />
    </svg>
);
