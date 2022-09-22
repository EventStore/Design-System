import { dirname, join, sep } from 'path';
import type {
    BuildCtx,
    OutputTargetCustom,
    CompilerCtx,
    Config as StencilConfig,
    JsonDocs,
} from '@stencil/core/internal';

class DevMode implements OutputTargetCustom {
    public type: 'custom' = 'custom';
    public name = 'dev-mode';

    async generator(
        stencilConfig: StencilConfig,
        compilerCtx: CompilerCtx,
        buildCtx: BuildCtx,
        docs: JsonDocs,
    ) {
        const timespan = buildCtx.createTimeSpan('dev mode started', true);

        const devComponents = buildCtx.components
            .filter(({ isCollectionDependency }) => !isCollectionDependency)
            .filter(({ sourceFilePath }) =>
                sourceFilePath.endsWith('.demo.tsx'),
            )
            .map<[string, string]>(({ tagName }) => [
                tagName,
                docs.components.find((c) => c.tag === tagName)?.docs ?? '',
            ]);

        const filePath = join(stencilConfig.rootDir!, 'www', 'index.html');

        await compilerCtx.fs.writeFile(
            filePath,
            buildIndex({
                name: stencilConfig.fsNamespace ?? 'app',
                devComponents,
            }),
        );

        timespan.finish('generate plugin manifest finished');
    }
}

export const devMode = (): DevMode => new DevMode();

interface IndexBuilder {
    name: string;
    devComponents: Array<[string, string]>;
}

const buildIndex = ({ name, devComponents }: IndexBuilder) => `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    <head>
        <meta charset="utf-8" />
        <title>${name}</title>
        <meta
            name="Description"
            content="Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil!"
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        />
        <meta name="theme-color" content="#16161d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta http-equiv="x-ua-compatible" content="IE=Edge" />

        <link href="/build/${name}.css" rel="stylesheet" />
        <script type="module" src="/build/${name}.esm.js"></script>
        <script nomodule src="/build/${name}.js"></script>

        <link
            rel="icon"
            type="image/x-icon"
            href="/assets/favicons/favicon.ico"
        />
    </head>
    <body>
        <ul class="links">
            ${devComponents
                .map(
                    ([name, description]) =>
                        `<li><a href="${name}"><b>${name}</b><span>${description}</span></a></li>`,
                )
                .join(' ')}
        </ul>
        <script>
        const tagname = document.location.pathname.replace('/', '');

        if (tagname != '') {
            const links = document.querySelector("ul.links").remove();
            const el = document.createElement(tagname);
            document.body.append(el);
        }
        </script>
    </body>
</html>
`;
