import type { h as jsxFactory, VNode } from '@stencil/core';

export type RenderFunction<T extends any[] = []> = (
    h: typeof jsxFactory,
    ...args: T
) => VNode | VNode[] | null | string;
