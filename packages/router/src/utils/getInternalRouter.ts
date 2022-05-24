import { forceUpdate, getRenderingRef } from '@stencil/core';
import { INTERNAL_ROUTER } from './globals';

export const getInternalRouter = () =>
    window[INTERNAL_ROUTER].with(getRenderingRef, forceUpdate);
