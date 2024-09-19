import { join } from 'path';
import type {
    BuildCtx,
    OutputTargetCustom,
    CompilerCtx,
    Config as StencilConfig,
    JsonDocs,
} from '@stencil/core/internal';

interface Demo {
    tagName: string;
    description: string;
    tags: Map<string, string>;
    group: string;
}

type DevComponents = Map<string, Demo[]>;

const DEFAULT_GROUP = 'other';

class DevMode implements OutputTargetCustom {
    public type = 'custom' as const;
    public name = 'dev-mode';

    async generator(
        stencilConfig: StencilConfig,
        compilerCtx: CompilerCtx,
        buildCtx: BuildCtx,
        docs: JsonDocs,
    ) {
        const timespan = buildCtx.createTimeSpan('dev mode started', true);

        const devComponents: DevComponents = new Map();

        for (const component of buildCtx.components) {
            if (component.isCollectionDependency) continue;
            if (!component.sourceFilePath.endsWith('demo.tsx')) continue;

            const componentDocs = docs.components.find(
                (c) => c.tag === component.tagName,
            );

            // Component has be marked as internal
            if (!componentDocs) continue;

            const tags = componentDocs.docsTags.reduce(
                (acc, tag) => acc.set(tag.name, tag.text ?? ''),
                new Map<string, string>(),
            );

            const group =
                tags.get('group')?.toLocaleLowerCase() ?? DEFAULT_GROUP;

            if (!devComponents.has(group)) {
                devComponents.set(group, []);
            }

            devComponents.get(group)?.push({
                tagName: component.tagName,
                description: componentDocs.docs || component.tagName,
                tags,
                group,
            });
        }

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
    devComponents: DevComponents;
}

const buildIndex = ({ name, devComponents }: IndexBuilder) => `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    <head>
        <meta charset="utf-8" />
        <title>${name}</title>
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
        <style>
            body {
                display: block;
            }

            body ul.links {
                list-style: none;
                padding: 10px 20px;
                margin: 0;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
            }

            body ul.links .group_title {
                margin: 10px 0;
                text-transform: capitalize;
                font-weight: 300;
            }

            body ul.links a {
                color: #435261;
                text-decoration: none;
                font-size: 18px;
            }

            body ul.links a:hover,
            body ul.links a:focus-visible {
                text-decoration: underline;
            }

            body ul.group_links {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding-left: 20px;
            }
        </style>
    </head>
    <body>
        <ul class="links">
            ${Array.from(devComponents)
                .sort(([groupA], [groupB]) =>
                    groupA === DEFAULT_GROUP
                        ? 1
                        : groupB === DEFAULT_GROUP
                        ? -1
                        : groupA.localeCompare(groupB),
                )
                .map(([group, demos], _, groups) => {
                    const children = demos
                        .sort((a, b) =>
                            a.description.localeCompare(b.description),
                        )
                        .map(
                            ({ tagName, description }) =>
                                `<li><a href="${tagName}">${description}</a></li>`,
                        )
                        .join('\n');

                    if (group === DEFAULT_GROUP && groups.length === 1) {
                        return children;
                    }

                    return `<li class="group">
                                <h2 class="group_title">${group}</h2>
                                <ul class="group_links">
                                    ${children}
                                </ul>
                            </li>`;
                })
                .join('\n')}
        </ul>
        <script>
        const tagname = document.location.pathname.split("/").at(1);

        if (tagname != '') {
            const links = document.querySelector("ul.links").remove();
            const el = document.createElement(tagname);
            document.body.append(el);
        }
        </script>
    </body>
</html>
`;
