import { packageConfig } from '../../tools/stencilConfig';

export const config = packageConfig({
    namespace: 'k-fields',
    globalScript: 'src/init.ts',
    copy: [
        {
            src: './components/field.css',
            dest: `${__dirname}/css/field.css`,
            warn: true,
        },
        {
            src: './components/input.css',
            dest: `${__dirname}/css/input.css`,
            warn: true,
        },
    ],
});
