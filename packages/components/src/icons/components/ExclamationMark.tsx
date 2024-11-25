/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ExclamationMark = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 4h2v11h-2V4Zm2 14v2h-2v-2h2Z" />
    </svg>
);
