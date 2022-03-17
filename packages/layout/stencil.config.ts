import { packageConfig, flags } from '@eventstore/configs/stencil';

export const config = packageConfig({
    namespace: 'es-layout',
    globalScript: 'src/init.ts',
    globalStyle: flags.dev ? 'src/dev.css' : undefined,
    copy: [
        {
            src: './css',
            dest: `${__dirname}/css`,
            warn: true,
        },
    ],
});
