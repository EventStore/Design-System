import { wDKey } from '../symbols';
import type { ValidatedForm } from '../types';

export const isValidatedForm = (d: any): d is ValidatedForm<any> =>
    d != null && !!d[wDKey];
