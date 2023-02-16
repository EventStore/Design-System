import { packageConfig, flags } from '../../tools/stencilConfig';

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
