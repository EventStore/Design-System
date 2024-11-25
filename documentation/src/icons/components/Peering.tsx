/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Peering = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21 9-4-4v3h-7v2h7v3M7 11l-4 4 4 4v-3h7v-2H7v-3Z" />
    </svg>
);
