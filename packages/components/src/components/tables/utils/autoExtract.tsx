import type { h as jsxFactory, VNode } from '@stencil/core';

export const autoExtract = (
    h: typeof jsxFactory,
    data: any,
    name: string,
): VNode | string => {
    const value = data?.[name];
    const stringified = value != null ? String(value).trim() : '';
    return stringified.length > 0 ? stringified : <i class={'none'}>{'-'}</i>;
};
