import { packageConfig } from '@eventstore/configs/stencil';

export const config = packageConfig({
    namespace: 'es-editor',
    globalScript: 'src/init.ts',
});
