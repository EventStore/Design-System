/* eslint-disable no-console */
import { readFile, readdir, writeFile, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

import { optimize } from 'svgo';
import prettier from 'prettier';
import { snakeCase, capitalCase, kebabCase, pascalCase } from 'case-anything';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputDir = join(__dirname, '../raw');
const outputDir = join(__dirname, '../src/components');

export const optimiseSVG = (svg, name) => {
    let css = '';
    const optimized = optimize(svg, {
        js2svg: {
            pretty: true,
        },
        plugins: [
            {
                name: 'removeTopLevelId',
                type: 'visitor',
                fn() {
                    return {
                        element: {
                            enter: (node, parentNode) => {
                                if (
                                    node.name === 'svg' &&
                                    parentNode.type === 'root'
                                ) {
                                    delete node.attributes['id'];
                                }
                            },
                        },
                    };
                },
            },
            'cleanupAttrs',
            'removeDoctype',
            'removeXMLProcInst',
            'removeComments',
            'removeMetadata',
            'removeDesc',
            'removeUselessDefs',
            'removeEditorsNSData',
            'removeEmptyAttrs',
            'removeHiddenElems',
            'removeEmptyText',
            'removeEmptyContainers',
            'cleanupEnableBackground',
            'convertStyleToAttrs',
            'convertColors',
            'convertPathData',
            'convertTransform',
            'removeUnknownsAndDefaults',
            'removeNonInheritableGroupAttrs',
            'removeUselessStrokeAndFill',
            'removeUnusedNS',
            'cleanupIDs',
            'cleanupNumericValues',
            'moveElemsAttrsToGroup',
            'moveGroupAttrsToElems',
            'collapseGroups',
            'mergePaths',
            'convertShapeToPath',
            'sortAttrs',
            'removeDimensions',
            'removeRasterImages',
            {
                name: 'removeViewBox',
                active: false,
            },
            {
                name: 'prefixIds',
                params: {
                    prefix: name,
                    delim: '_',
                },
            },
            {
                name: 'addAttributesToSVGElement',
                params: {
                    attributes: [
                        {
                            'aria-hidden': 'true',
                            width: '100%',
                            height: '100%',
                            focusable: 'false',
                            role: 'img',
                            part: 'illustration',
                        },
                    ],
                },
            },
            {
                name: 'jsxSafe',
                type: 'visitor',
                fn() {
                    return {
                        element: {
                            enter: (node) => {
                                if (node.attributes['xlink:href']) {
                                    node.attributes.href =
                                        node.attributes['xlink:href'];

                                    delete node.attributes['xlink:href'];
                                }

                                if (node.attributes['xmlns:xlink']) {
                                    delete node.attributes['xmlns:xlink'];
                                }

                                if (node.attributes['xml:space']) {
                                    delete node.attributes['xml:space'];
                                }
                            },
                        },
                    };
                },
            },
            {
                name: 'extractStyles',
                type: 'visitor',
                fn() {
                    return {
                        element: {
                            enter: (node, parentNode) => {
                                if (node.name !== 'style') return;
                                const text = node.children[0].value;
                                css = [css, text].join('\n');
                                parentNode.children =
                                    parentNode.children.filter(
                                        (child) => child !== node,
                                    );
                            },
                        },
                    };
                },
            },
        ],
    }).data;

    return { svg: optimized, css };
};

const createComponent = ({ title, light, dark }, noCss) => {
    const bothModes = !!light?.svg && !!dark?.svg;

    return `
import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/** 
 * Displays ${capitalCase(title)} illustration. 
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-${kebabCase(title)}',
    ${noCss ? '' : `styleUrl: '${kebabCase(title)}.css',`}
    shadow: true,
})
export class EsIllustration${pascalCase(title)} {
    render() {
        const isDark = theme.isDark();

        return (
            <Host dark={isDark} light={!isDark}>
                ${
                    bothModes
                        ? '{isDark ? this.renderDark() : this.renderLight()}'
                        : light?.svg ?? dark?.svg ?? ''
                }
           
            </Host>
        )
    }
    ${
        bothModes
            ? `
        renderLight() {
            return (
                ${light.svg}
            )
        }`
            : ''
    }
    ${
        bothModes
            ? `
        renderDark() {
            return (
                ${dark.svg}
            )
        }`
            : ''
    }
}
`;
};

const postcssify = (css) =>
    css.replace(/\.([a-z_]+)/g, (_, classname) => `& .${classname}`);

const createCss = ({ light, dark }) => `
        ${
            light.css.trim().length
                ? `:host([light]) {${postcssify(light.css)}}`
                : ''
        }
        ${
            dark.css.trim().length
                ? `:host([dark]) {${postcssify(dark.css)}}`
                : ''
        }
    `;

const createUsage = ({ title }) => `
\`\`\`tsx
export default () => (
    <es-illustration-${kebabCase(title)} />
);
\`\`\`

\`\`\`css
:host {
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
}
\`\`\`
`;

const nameRegex = /^[a-z]+-(Light|Dark)\.svg$/i;
const parseFileName = (filename, input) => {
    if (!nameRegex.test(filename)) {
        console.warn(
            `${filename} does not match [title]-(light|dark).svg and will be skipped.`,
        );
        return false;
    }
    const [title, mode] = basename(filename, '.svg').split('-');
    return {
        title,
        mode: mode.toLowerCase(),
        path: join(input, filename),
    };
};

const importIllustration = async ({ title, ...modes }) => {
    const lightFile = await readFile(modes.light);
    const darkFile = await readFile(modes.dark);
    const light = optimiseSVG(lightFile.toString(), snakeCase(title));
    const dark = optimiseSVG(darkFile.toString(), snakeCase(title));
    const baseDir = join(outputDir, `${kebabCase(title)}`);
    const componentPath = join(
        baseDir,
        `es-illustration-${kebabCase(title)}.tsx`,
    );
    const cssPath = join(baseDir, `${kebabCase(title)}.css`);
    const usageDir = join(baseDir, 'usage');
    const usagePath = join(usageDir, 'example.md');

    const details = { title, light, dark };

    const css = createCss(details);
    const noCss = !css.trim().length;
    const component = createComponent(details, noCss);
    const usage = createUsage(details);

    const prettierConfig = await prettier.resolveConfig(baseDir, {
        editorconfig: true,
    });

    const prettyComponent = prettier.format(component, {
        ...(prettierConfig || {}),
        parser: 'babel-ts',
    });

    await mkdir(baseDir, { recursive: true });
    await writeFile(componentPath, prettyComponent);

    if (!noCss) {
        const prettyCss = prettier.format(css, {
            ...(prettierConfig || {}),
            parser: 'css',
        });

        await writeFile(cssPath, prettyCss);
    }

    const prettyUsage = prettier.format(usage, {
        ...(prettierConfig || {}),
        parser: 'markdown',
    });

    await mkdir(usageDir, { recursive: true });
    await writeFile(usagePath, prettyUsage);
    console.log(`${title} ✔️`);
};

const importIllustrations = async () => {
    const files = await readdir(inputDir);

    const illustrations = new Map();

    for (const file of files) {
        const details = parseFileName(file, inputDir);
        if (!details) continue;

        const { title, path, mode } = details;

        if (!illustrations.has(title)) {
            illustrations.set(title, {
                title,
                [mode]: path,
            });
        } else {
            illustrations.get(title)[mode] = path;
        }
    }

    for (const [title, details] of illustrations) {
        if (!details.dark) {
            console.warn(`${title} illustration is missing dark mode`);
        }
        if (!details.light) {
            console.warn(`${title} illustration is missing light mode`);
        }

        await importIllustration(details);
    }
};

importIllustrations();
