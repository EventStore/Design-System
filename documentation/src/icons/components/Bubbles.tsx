/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Bubbles = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.2 11.2c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2m7.6 4.8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m.4-12A4.8 4.8 0 0 1 20 8.8c0 2.65-2.15 4.8-4.8 4.8a4.8 4.8 0 0 1-4.8-4.8c0-2.65 2.15-4.8 4.8-4.8Z" />
    </svg>
);
