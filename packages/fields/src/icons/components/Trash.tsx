/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Trash = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M4.5 5v17h15V5h-15ZM10 10v6.5M14 10v6.5M2 5h20M8 5l1.645-3h4.744L16 5H8Z" />
    </svg>
);
