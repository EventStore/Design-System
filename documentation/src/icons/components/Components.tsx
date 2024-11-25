/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Components = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 13.5v8H3v-8h8M12 2l5.5 9h-11L12 2m5.5 11c2.5 0 4.5 2 4.5 4.5S20 22 17.5 22 13 20 13 17.5s2-4.5 4.5-4.5Z" />
    </svg>
);
