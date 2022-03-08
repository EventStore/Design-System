import { packageConfig } from '@eventstore/configs/stencil';

export const config = packageConfig({
    namespace: 'es-fields',
    globalScript: 'src/init.ts',
});
