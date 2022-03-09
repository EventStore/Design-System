import { wDAKey, wDKey } from '../../symbols';
import type { WorkingData, WorkingDataArray } from '../../types';

export const isWorkingData = (d: any): d is WorkingData<any> =>
    d != null && !!d[wDKey];

export const isWorkingDataArray = (d: any): d is WorkingDataArray<any> =>
    d != null && !!d[wDAKey];

export const isChildData = (
    d: any,
): d is WorkingData<any> | WorkingDataArray<any> =>
    isWorkingData(d) || isWorkingDataArray(d);
