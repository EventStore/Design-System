/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Scroll = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.1 3.3H8.5c-2.2 0-3.9 1.8-3.9 3.9V15H2.7c-.7 0-1.3.6-1.3 1.3v.6c0 2.1 1.7 3.8 3.8 3.8h10.5c1.7-.2 3-1.6 3-3.3v-7.2h3c.7 0 1.3-.6 1.3-1.3V6.2c0-1.6-1.3-2.9-2.9-2.9zM12.2 15H6.1V7.2c0-1.3 1.1-2.4 2.4-2.4h9.1c-.2.4-.3.9-.3 1.4v11.1c0 1-.9 1.9-1.9 1.9s-1.9-.9-1.9-1.9v-1.1c0-.7-.6-1.2-1.3-1.2zm.4 4.2H5.3c-1.3 0-2.3-1-2.3-2.3v-.4h9v.8c0 .7.2 1.3.6 1.9zm6.2-13c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4v2.4h-2.7V6.2z" />
    </svg>
);
