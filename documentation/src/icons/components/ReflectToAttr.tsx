/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ReflectToAttr = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 20h-8a1 1 0 0 1-1-1V4.97a1 1 0 0 1 .74-.97c.45-.12.91.08 1.13.47l8.02 14.03c.18.31.18.69 0 1-.18.31-.51.5-.89.5M2 20c-.38 0-.71-.19-.89-.5a.993.993 0 0 1 0-1L9.13 4.47c.22-.39.68-.59 1.13-.47a1 1 0 0 1 .74.97V19a1 1 0 0 1-1 1H2m7-2V8.74L3.71 18H9Z" />
    </svg>
);
