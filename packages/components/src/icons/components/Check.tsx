/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Check = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.7 18.9c-.4 0-.7-.1-1-.4L3.2 13c-.5-.5-.5-1.4 0-2 .5-.5 1.4-.5 2 0l4.6 4.6L19.9 5.5c.5-.5 1.4-.5 2 0 .5.5.5 1.4 0 2l-11.2 11c-.3.3-.6.4-1 .4z" />
    </svg>
);
