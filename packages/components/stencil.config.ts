import { packageConfig } from '../../tools/stencilConfig';

export const config = packageConfig({
    namespace: 'es-components',
    globalScript: 'src/init.ts',
    copy: [
        {
            src: './components/actions/action.css',
            dest: `${__dirname}/css/action.css`,
            warn: true,
        },
    ],
});
