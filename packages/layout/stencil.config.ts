import { packageConfig } from '@eventstore/configs/stencil';

export const config = packageConfig({
    namespace: 'es-layout',
    globalScript: 'src/init.ts',
});
