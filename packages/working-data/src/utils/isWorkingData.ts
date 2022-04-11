import { wDKey } from '../symbols';
import type { WorkingData } from '../types';

export const isWorkingData = (d: any): d is WorkingData<any> =>
    d != null && !!d[wDKey];
