/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Editor = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.59 3.41 7 4.82 3.82 8 7 11.18 5.59 12.6 1 8l4.59-4.59m5.82 0L16 8l-4.59 4.6L10 11.18 13.18 8 10 4.82l1.41-1.41M22 6v12c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2v-4h2v4h16V6h-2.97V4H20c1.11 0 2 .89 2 2Z" />
    </svg>
);
